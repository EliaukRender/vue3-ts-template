<template>
  <div class="sticky-demo">
    <div class="container">
      <div class="sticky-section">
        <div class="sticky-header">Section 1 Header</div>
        <div class="content">
          <p>This is the content for section 1. The header above will stick to the top while this content scrolls.</p>
          <div class="placeholder"></div>
        </div>
      </div>

      <div class="sticky-section">
        <div class="sticky-header">Section 2 Header</div>
        <div class="content">
          <p>This is the content for section 2. The header above will stick to the top while this content scrolls.</p>
          <div class="placeholder"></div>
        </div>
      </div>

      <div class="sticky-section">
        <div class="sticky-header">Section 3 Header</div>
        <div class="content">
          <p>This is the content for section 3. The header above will stick to the top while this content scrolls.</p>
          <div class="placeholder"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
// No script logic needed for this demo
</script>

<style lang="scss" scoped>
.sticky-demo {
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .sticky-section {
    margin-bottom: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 100vh;
    position: relative;

    .sticky-header {
      position: sticky;
      top: 0;
      background-color: #4a90e2;
      color: white;
      padding: 1rem;
      z-index: 1;
      width: 100%;
    }

    .content {
      padding: 1rem;

      .placeholder {
        height: 800px;
        background-color: #e0e0e0;
        border-radius: 4px;
        margin-top: 1rem;
      }
    }
  }
}
</style>