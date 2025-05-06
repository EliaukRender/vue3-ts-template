/**
 * @file index.ts
 * @description 消息提示组件
 * @date 2025-05-04
 */

import { ElMessage, type MessageHandler, ElMessageBox } from "element-plus";

/**
 * Toast提示的参数类型
 */
interface ToastOptions {
  message: string;
  type?: "success" | "warning" | "info" | "error";
  duration?: number;
  customClass?: string;
}

/**
 * 二次确认框的参数类型
 */
interface ConfirmOptions {
  confirmTitle: string;
  confirmContent: string;
  callBack: () => void;
  type?: "success" | "warning" | "info" | "error";
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}

abstract class Toast {
  abstract ShowToast(options: ToastOptions): void;
  abstract ShowConfirmBox(confirmOptions: ConfirmOptions): void;
}

/**
 * Text
 */
class MyToastUtil implements Toast {
  static instance: MessageHandler | null = null;

  /**
   * Toast提示条
   */
  ShowToast(options: ToastOptions) {
    if (!options?.type) {
      options.type = "success";
    }
    if (!MyToastUtil.instance) {
      MyToastUtil.instance = ElMessage(options);
      return;
    }
    MyToastUtil.instance.close();
    MyToastUtil.instance = ElMessage(options);
  }

  /**
   * 二次确认框
   */
  ShowConfirmBox(confirmOptions: ConfirmOptions): void {
    const {
      type,
      confirmTitle,
      confirmContent,
      showCancelButton,
      showConfirmButton,
      callBack,
    } = confirmOptions;
    ElMessageBox({
      type: type || "success",
      title: confirmTitle,
      message: confirmContent,
      showCancelButton: showCancelButton || true,
      showConfirmButton: showConfirmButton || true,
    })
      .then(() => {
        callBack();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
}

export const MessageUtil = new MyToastUtil();
