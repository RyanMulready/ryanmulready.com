<script setup lang="ts">
import { onMounted } from 'vue';
import { useGitHubStore } from '@/stores/github';

// init our pinia store
const ghStore = useGitHubStore();

// load page first then trigger fetch to fill data
onMounted(async () => {
    await ghStore.fetchContributions();
});
</script>

<template>
    <div>
        <div class="grid">
            <div>
                <div class="mockup-code">
                    <pre>
                        <code>
                            {{ ghStore.getContributions }}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>
