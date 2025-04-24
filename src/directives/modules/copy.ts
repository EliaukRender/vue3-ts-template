/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}

// 复制操作
async function handleClick(this: any) {
  const textToCopy = this.copyData || this.textContent?.trim();
  if (!textToCopy) {
    ElMessage({
      type: "warning",
      message: "没有可复制的内容",
      duration: 2000
    });
    return;
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    ElMessage({
      type: "success",
      message: "复制成功",
      duration: 2000
    });
  } catch (err) {
    console.error("复制操作不被支持或失败: ", err);
    ElMessage({
      type: "error",
      message: "复制失败",
      duration: 2000
    });
  }
}

// 指令
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
};

export default copy;
