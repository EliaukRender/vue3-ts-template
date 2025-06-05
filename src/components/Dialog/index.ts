/**
 * @file index.ts
 * @description 命令式弹窗组件 (后续使用过程中可以逐步完善优化)
 * @date 2025-05-12
 */
import { h, createApp } from 'vue'
import type { Component, Ref } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { loadGlobalPlugins } from '@/utils/loadGlobalPlugins'
import './index.scss'
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

// content组件组件
interface BaseComponentInstance {
  onOk?: () => Promise<void> | void
  beforeClose?: () => Promise<void> | void // 添加beforeClose方法
  [key: string]: any
}

interface DialogContentProps {
  [key: string]: unknown
}

// render-dialog函数返回值的类型
interface DialogInstance<
  T extends BaseComponentInstance = BaseComponentInstance,
> {
  visible: Ref<boolean>
  contentInstance: Ref<T | undefined>
  unmountDialog: () => void
  closeConfirmBtnLoading: () => void
  showConfirmBtnLoading: () => void
}

export interface ElDialogProps {
  width?: string // 弹窗宽度
  modelValue?: boolean // 弹窗是否显示
  showClose?: boolean // 是否显示关闭按钮（不需要显示，header部分已重写）
  closeOnClickModal?: boolean // 点击弹窗外部是否关闭
  closeOnPressEscape?: boolean // 按下esc是否关闭
  showConfirmButton?: boolean // 是否显示确认按钮
  showCancelButton?: boolean // 是否显示取消按钮
  alignCenter?: boolean // 是否居中
  modal?: boolean // 是否需要遮罩层
  lockScroll?: boolean // 是否锁定背景滚动
  confirmButtonText?: string
  cancelButtonText?: string
  showHeader?: boolean // 是否显示头部
  showFooter?: boolean // 是否显示底部
  showHeaderBottomBorder?: boolean // 是否显示头部底部边框
  fullscreen?: boolean // // 全屏展示
  customClassName?: string // 自定义样式
  beforeClose?: () => Promise<void> | void // 添加beforeClose属性
  [key: string]: any // 允许其他属性
}

// 默认element-plus弹窗配置
const defaultElDialogProps: ElDialogProps = {
  width: '50%', // 弹窗宽度
  modelValue: false, // 弹窗是否显示
  showClose: false, // 是否显示关闭按钮
  closeOnClickModal: false, // 点击弹窗外部是否关闭
  closeOnPressEscape: false, // 按下esc是否关闭
  showConfirmButton: true, // 是否显示确认按钮
  showCancelButton: true, // 是否显示取消按钮
  alignCenter: true, // 是否居中
  modal: true, // 是否需要遮罩层
  lockScroll: true, // 是否锁定背景滚动
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  title: '弹窗标题',
  showHeaderBottomBorder: true, // 是否显示头部底部边框
  showHeader: true, // 是否显示头部
  showFooter: true, // 是否显示底部
  autoClose: true, // 是否自动关闭弹窗
  fullscreen: false, // 全屏展示
  customClassName: '',
}

/**
 * @description 弹窗组件
 * @param {Component} DialogContentComponent - 弹窗内容组件
 * @param {DialogContentProps} props - 弹窗内容组件的props
 * @param {ElDialogProps} customElDialogProps - 用户传入的element-plus弹窗组件的props
 * @param {Function} confirmCallback - 确认回调
 * @param {Function} cancelCallback - 取消回调
 * @returns {DialogInstance} 弹窗实例
 */
export const renderDialog = <
  T extends BaseComponentInstance = BaseComponentInstance,
>(
  DialogContentComponent: Component,
  props: DialogContentProps,
  customElDialogProps: ElDialogProps,
  confirmCallback?: () => Promise<void> | void,
  cancelCallback?: () => Promise<void> | void
): DialogInstance<T> => {
  const visible = ref(true) // 弹窗是否显示
  const confirmBtnLoading = ref(false) // 确认按钮是否加载中
  const contentInstance = ref<T>() // 弹窗内容组件实例

  // 合并默认弹窗配置和用户传入的弹窗配置
  const totalProps = {
    ...defaultElDialogProps,
    ...customElDialogProps,
  }

  /**
   * 渲染弹窗
   */
  const customDialog = () => {
    return h(
      ElDialog,
      {
        ...totalProps,
        modelValue: visible.value,
        class: [
          'custom-render-dialog', // 默认类名
          !totalProps.showHeader && 'custom-render-dialog-no-header',
          !totalProps.showFooter && 'custom-render-dialog-no-footer',
          totalProps.fullscreen && 'custom-render-dialog-full-screen', // 全屏时的类名
          totalProps.customClassName, // 自定义类名(自定义dialog的宽度与高度)
        ],
      },
      /**
       * 插槽
       */
      {
        // 弹窗头部
        header: totalProps.showHeader
          ? () =>
              h(
                'div',
                {
                  class: [
                    'custom-render-dialog-header',
                    totalProps.showHeaderBottomBorder
                      ? 'custom-render-dialog-header-bottom-border'
                      : '',
                  ],
                },
                [
                  h(
                    'div',
                    { class: 'custom-render-dialog-title' },
                    totalProps.title
                  ),
                  h(
                    'div',
                    {
                      class: 'custom-render-dialog-close',
                      onClick: () => unmountDialog(),
                    },
                    [h(Close)]
                  ),
                ]
              )
          : undefined,
        // 弹窗中自定义的内容组件
        default: () =>
          h(DialogContentComponent, {
            ...props,
            ref: contentInstance,
          }),
        // 弹窗底部
        footer: totalProps.showFooter
          ? () =>
              h('div', { class: 'custom-render-dialog-footer' }, [
                // 取消按钮
                totalProps.showCancelButton &&
                  h(
                    ElButton,
                    {
                      onClick: () => unmountDialog(),
                      class: 'cancel-button',
                      type: 'default',
                    },
                    () => totalProps.cancelButtonText
                  ),
                // 确认按钮
                totalProps.showConfirmButton &&
                  h(
                    ElButton,
                    {
                      type: 'primary',
                      onClick: async () => {
                        await clickConfirm()
                      },
                      class: 'confirm-button',
                      loading: confirmBtnLoading.value,
                    },
                    () => totalProps.confirmButtonText
                  ),
              ])
          : undefined,
      }
    )
  }

  const app = createApp(customDialog) // 创建弹窗实例
  loadGlobalPlugins(app) // 加载全局插件
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)

  /**
   * 点击确认按钮
   */
  async function clickConfirm() {
    try {
      // 调用组件内部的确认方法
      if (contentInstance.value?.onOk) {
        confirmBtnLoading.value = true
        await contentInstance.value?.onOk() // 触发弹窗内容组件的确认回调
      }
      // 执行外部传入的确认方法
      if (confirmCallback) {
        await confirmCallback()
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (totalProps.autoClose) {
        confirmBtnLoading.value = false
        totalProps.autoClose && (await unmountDialog()) // 自动关闭弹窗
      }
    }
  }

  /**
   * 点击取消按钮，卸载dialog组件
   */
  async function unmountDialog() {
    try {
      // 先执行内容组件的beforeClose
      if (contentInstance.value?.beforeClose) {
        await contentInstance.value.beforeClose()
      }

      // 再执行外部传入的beforeClose
      if (totalProps.beforeClose) {
        await totalProps.beforeClose()
      }

      visible.value = false
      // 触发外部传入的取消回调
      if (cancelCallback) {
        await cancelCallback()
      }
      setTimeout(() => {
        app.unmount()
        document.body.removeChild(div)
      }, 1000)
    } catch (error) {
      console.error('关闭弹窗前的预处理操作失败:', error)
    }
  }

  /**
   * 关闭确认按钮的loading效果
   */
  function closeConfirmBtnLoading() {
    confirmBtnLoading.value = false
  }

  /**
   * 显示确认按钮的loading效果
   */
  function showConfirmBtnLoading() {
    confirmBtnLoading.value = true
  }

  return {
    visible,
    contentInstance, // 弹窗内容组件实例
    unmountDialog, // 卸载dialog组件方法
    closeConfirmBtnLoading, // 关闭确认按钮的loading效果
    showConfirmBtnLoading, // 显示确认按钮的loading效果
  }
}
