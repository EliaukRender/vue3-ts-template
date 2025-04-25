/**
 * @file index.ts
 * @description 命令式弹窗组件
 * @date 2025-04-25
 */
import { h, createApp } from "vue";
import type { Component, Ref } from "vue";
import { ElDialog, ElButton } from "element-plus";
import { loadGlobalPlugins } from "@/utils/loadGlobalPlugins";
import "./index.scss";

interface ElDialogProps {
  width?: string; // 弹窗宽度
  modelValue?: boolean; // 弹窗是否显示
  showClose?: boolean; // 是否显示关闭按钮
  closeOnClickModal?: boolean; // 点击弹窗外部是否关闭
  closeOnPressEscape?: boolean; // 按下esc是否关闭
  showConfirmButton?: boolean; // 是否显示确认按钮
  showCancelButton?: boolean; // 是否显示取消按钮
  alignCenter?: boolean; // 是否居中
  modal?: boolean; // 是否需要遮罩层
  lockScroll?: boolean; // 是否锁定背景滚动
  confirmButtonText?: string;
  cancelButtonText?: string;
  [key: string]: any; // 允许其他属性
}

interface DialogContentProps {
  [key: string]: any;
}

interface DialogInstance {
  visible: Ref<boolean>;
  contentInstance: Ref<any>;
  unmountDialog: () => void;
}

// 默认element-plus弹窗配置
const defaultElDialogProps: ElDialogProps = {
  width: "50%", // 弹窗宽度
  modelValue: false, // 弹窗是否显示
  showClose: true, // 是否显示关闭按钮
  closeOnClickModal: false, // 点击弹窗外部是否关闭
  closeOnPressEscape: false, // 按下esc是否关闭
  showConfirmButton: true, // 是否显示确认按钮
  showCancelButton: true, // 是否显示取消按钮
  alignCenter: true, // 是否居中
  modal: true, // 是否需要遮罩层
  lockScroll: true, // 是否锁定背景滚动
  confirmButtonText: "确定",
  cancelButtonText: "取消",
};

/**
 * @description 弹窗组件
 * @param {Component} DialogContentComponent - 弹窗内容组件
 * @param {DialogContentProps} props - 弹窗内容组件的props
 * @param {ElDialogProps} customElDialogProps - 用户传入的element-plus弹窗组件的props
 * @returns {DialogInstance} 弹窗实例
 */
export const renderDialog = (
  DialogContentComponent: Component,
  props: DialogContentProps,
  customElDialogProps: ElDialogProps
): DialogInstance => {
  const visible = ref(true); // 弹窗是否显示
  const confirmBtnLoading = ref(false); // 确认按钮是否加载中
  const contentInstance = ref<any>(null); // 弹窗内容组件实例

  // 合并默认弹窗配置和用户传入的弹窗配置
  const totalProps = {
    ...defaultElDialogProps,
    ...customElDialogProps,
  };

  /**
   * 渲染弹窗
   */
  const customDialog = () => {
    return h(
      ElDialog,
      {
        ...totalProps,
        modelValue: visible.value,
        class: "custom-render-dialog",
      },
      {
        // 弹窗中自定义的内容组件
        default: () =>
          h(DialogContentComponent, { ...props, ref: contentInstance }),
        // 弹窗底部
        footer: () =>
          h("div", { class: "dialog-footer" }, [
            // 取消按钮
            totalProps.showCancelButton &&
              h(
                ElButton,
                {
                  onClick: () => unmountDialog(),
                  class: "cancel-button",
                  plain: true,
                },
                () => defaultElDialogProps.cancelButtonText
              ),
            // 确认按钮
            totalProps.showConfirmButton &&
              h(
                ElButton,
                {
                  type: "primary",
                  onClick: () => {
                    clickConfirm();
                    unmountDialog();
                  },
                  class: "confirm-button",
                  loading: confirmBtnLoading.value,
                },
                () => defaultElDialogProps.confirmButtonText
              ),
          ]),
      }
    );
  };

  const app = createApp(customDialog); // 创建弹窗实例
  loadGlobalPlugins(app); // 加载全局插件
  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);

  /**
   * 点击确认按钮
   */
  async function clickConfirm() {
    try {
      confirmBtnLoading.value = true;
      console.log("renderDialog clickConfirm", contentInstance.value);
      await contentInstance.value?.onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      confirmBtnLoading.value = false;
    }
  }

  /**
   * 点击取消按钮，卸载dialog组件
   */
  function unmountDialog() {
    visible.value = false;
    setTimeout(() => {
      app.unmount();
      document.body.removeChild(div);
    }, 1000);
  }

  return {
    visible,
    contentInstance, // 弹窗内容组件实例
    unmountDialog, // 卸载dialog组件方法
  };
};
