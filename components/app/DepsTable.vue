<script setup lang="ts">
interface Props {
  dependencies: Record<string, string>
}
const props = defineProps<Props>();

const latestVersions = ref<Record<string, string>>({});

async function fetchLatestVersion(pkgName: string) {
  try {
    const response = await fetch(`https://unpkg.com/${pkgName}/package.json`);
    const data = await response.json();
    return data.version;
  }
  catch (error) {
    console.error(`Failed to fetch version for package ${pkgName}:`, error);
    return null;
  }
}

async function fetchLatestVersions() {
  // fetch latest versions in parallel
  const promises = Object.keys(props.dependencies).map(async (pkgName) => {
    latestVersions.value[pkgName] = 'loading';
    try {
      latestVersions.value[pkgName] = await fetchLatestVersion(pkgName);
    }
    catch {
      latestVersions.value[pkgName] = 'error';
    }
  });
  await Promise.all(promises);
}

const depsTarget = ref<HTMLElement | null>(null);

if (import.meta.client) {
  useIntersectionObserver(depsTarget, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // If latest versions are not yet fetched, fetch them
      if (Object.keys(latestVersions.value).length === 0)
        fetchLatestVersions();
    }
  });
}
</script>

<template>
  <table ref="depsTarget" class="deps-table">
    <thead>
      <tr>
        <th class="" />
        <th class="" />
        <th class="autowidth" />
        <th class="" />
        <th class="" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key) in dependencies" :key="key">
        <td>{{ key }}</td>
        <template v-if="latestVersions[key] === 'error'">
          <td colspan="4" class="right">
            <span title="Failed to fetch latest version">
              <Icon
                name="ic:baseline-error"
                class="text-aurora-nord-11"
              />
            </span>
          </td>
        </template>

        <template v-else-if="latestVersions[key] === 'loading'">
          <td colspan="4" class="right">
            <span title="Loading">
              <Icon
                name="eos-icons:three-dots-loading"
                class="text-primary"
              />
            </span>
          </td>
        </template>

        <template
          v-else-if="
            latestVersions[key]
              && latestVersions[key] !== value.replace('^', '').trim()
          "
        >
          <td class="right">
            {{ value }}
          </td>
          <td class="text-center">
            <Icon name="mdi:arrow-right-thin" mode="svg" />
          </td>
          <td class="right">
            {{ latestVersions[key] }}
          </td>
          <td>
            <Icon
              title="Update available"
              mode="svg"
              name="material-symbols:arrow-circle-up"
              class="text-base text-aurora-nord-14"
            />
          </td>
        </template>

        <template v-else-if="latestVersions[key]">
          <td colspan="3" class="right">
            {{ value }}
          </td>
          <td>
            <Icon
              title="Up to date" mode="svg"
              name="material-symbols:check-box-rounded"
              class="text-base text-primary"
            />
          </td>
        </template>

        <template v-else>
          <td colspan="4" class="right">
            {{ value }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.deps-table {
  @apply table-auto w-full font-code;

  tr {
    @apply text-xs lg:text-sm;
  }

  th,
  td {
    @apply text-left align-middle;
  }

  td {
    @apply border-b border-b-snowstorm-nord-4 py-1 dark:border-b-polarnight-nord-2;

    &:not(:first-child) {
      @apply w-px whitespace-nowrap;
    }

    &:not(:first-child):not(:last-child) {
      @apply px-1 lg:px-2;
    }
  }

  td.autowidth {
    @apply w-px;
  }

  td.right {
    @apply text-right;
  }
}
</style>
