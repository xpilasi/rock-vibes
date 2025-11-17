<template>
  <article class="relative overflow-hidden rounded-lg shadow-card">
    <div class="aspect-[4/3] overflow-hidden">
      <div class="skeleton-image pulse w-full h-full"></div>
    </div>
    <div class="absolute inset-0 gradient-overlay-card">
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <div class="skeleton-date pulse mb-2"></div>
        <div class="skeleton-title pulse mb-2"></div>
        <div class="skeleton-excerpt pulse mb-1"></div>
        <div class="skeleton-excerpt short pulse mb-4"></div>
        <div class="skeleton-link pulse"></div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'NewsSkeletonLoader'
}
</script>

<style scoped>
.skeleton-image {
  background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
}

.skeleton-date {
  width: 120px;
  height: 14px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.skeleton-title {
  width: 85%;
  height: 28px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.skeleton-excerpt {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.skeleton-excerpt.short {
  width: 70%;
}

.skeleton-link {
  width: 100px;
  height: 16px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.gradient-overlay-card {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
}
</style>
