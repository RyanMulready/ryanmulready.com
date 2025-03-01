<template>
    <div>
        <input
            id="modal-about"
            v-model="showModal"
            autocomplete="off"
            name="modal-about"
            type="checkbox"
            class="modal-toggle" />

        <label
            for="modal-about"
            class="modal modal-bottom sm:modal-middle cursor-pointer">
            <label class="modal-box relative p-8">
                <label
                    for="modal-about"
                    class="p-3 absolute right-2 top-2 text-accent font-bold cursor-pointer">
                    {{ $t('modalDismiss') }}
                </label>

                <h1 class="text-white mb-5 text-2xl">
                    {{ $t('hiIam', { name: 'Ryan' }) }}
                </h1>

                <h2 class="text-white text-xl">
                    {{ $t('iAm') }}
                    <span
                        ref="jobTitle"
                        class="job-title">
                        {{ currentJobTitle }}
                    </span>
                    <span class="cursor-blink">
                        <!-- eslint-disable -->
                        |
                        <!-- eslint-enable -->
                    </span>
                </h2>
                <a
                    href="ryanmulready-cv.pdf"
                    target="_blank">
                    <nuxt-img
                        src="ryanmulready-cv.png"
                        lazy="true"
                        class="w-full mt-3"
                        alt="resume" />
                </a>
            </label>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from '#imports';
import { ref, watch } from 'vue';

const { t } = useI18n();

const jobTitles = [
    t('jobTitles.staffSoftwareEngineer'),
    t('jobTitles.engineeringManager'),
    t('jobTitles.teamLeader'),
    t('jobTitles.guildLeader'),
];
const jobTitleIndex = ref(0);
const currentJobTitle = ref('');
let typeInterval: ReturnType<typeof setTimeout> | null = null;
let delayModalTimeout: ReturnType<typeof setTimeout> | null = null;

function typeJobTitle() {
    let jobTitle = jobTitles[jobTitleIndex.value];
    let currentIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function typeNextCharacter() {
        delay = 100;
        if (isDeleting) {
            currentIndex -= 1;
        } else {
            currentIndex += 1;
        }

        currentJobTitle.value = jobTitle.slice(0, currentIndex);

        if (isDeleting) {
            delay = 50;
            // Finished deleting the job title
            if (currentIndex === 0) {
                isDeleting = false;
                jobTitleIndex.value =
                    (jobTitleIndex.value + 1) % jobTitles.length;
                jobTitle = jobTitles[jobTitleIndex.value];
            }
            // Finished typing the job title
        } else if (currentIndex === jobTitle.length) {
            isDeleting = true;
            delay = 2000; // Delay before moving to the next job title
        }
        typeInterval = setTimeout(typeNextCharacter, delay);
    }

    typeNextCharacter();
}

const showModal = ref(false);

// Watch for changes in showModal and start/stop the typing animation accordingly
watch(showModal, (newVal) => {
    currentJobTitle.value = ''; // Reset the job title
    clearTimeout(typeInterval!);
    clearTimeout(delayModalTimeout!);
    if (newVal) {
        delayModalTimeout = setTimeout(() => {
            typeJobTitle();
        }, 500);
    }
});
</script>

<style lang="scss">
.cursor-blink {
    animation: blink 0.8s step-end infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
