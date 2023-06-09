<template>
    <div>
        <input
            id="modal-contact"
            autocomplete="off"
            name="modal-contact"
            type="checkbox"
            class="modal-toggle"
            @change="clearForm" />

        <label
            for="modal-contact"
            class="modal modal-bottom sm:modal-middle cursor-pointer">
            <label class="modal-box relative p-8">
                <label
                    for="modal-contact"
                    class="p-3 absolute right-2 top-2 text-accent font-bold cursor-pointer">
                    ✕
                </label>

                <h1 class="text-white mb-5 text-2xl">Contact Me</h1>

                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Form
                        :disabled="submitting"
                        @submit="onSubmit">
                        <div class="mb-6">
                            <label
                                class="text-white mb-2 block text-md text-left"
                                for="name">
                                Name
                            </label>
                            <Field
                                id="name"
                                v-model="form.name"
                                name="name"
                                rules="isRequired"
                                :disabled="submitting"
                                class="w-full px-3 py-2 placeholder-base-200 bg-neutral rounded outline-none text-white"
                                type="text"
                                placeholder="Your Name" />
                            <ErrorMessage
                                v-slot="{ message }"
                                name="name">
                                <span class="text-error text-xs">
                                    {{ message }}
                                </span>
                            </ErrorMessage>
                        </div>

                        <div class="mb-6">
                            <label
                                class="text-white mb-2 block text-left"
                                for="email">
                                Email
                            </label>
                            <Field
                                id="email"
                                v-model="form.email"
                                name="email"
                                :disabled="submitting"
                                rules="isRequired|isValidEmail"
                                class="w-full px-3 py-2 placeholder-base-200 bg-neutral rounded outline-none text-white"
                                type="email"
                                placeholder="Your Email" />
                            <ErrorMessage
                                v-slot="{ message }"
                                name="email">
                                <span class="text-error text-xs">
                                    {{ message }}
                                </span>
                            </ErrorMessage>
                        </div>

                        <div class="mb-6">
                            <label
                                class="text-white mb-2 block text-left"
                                for="comment">
                                Message
                            </label>
                            <Field
                                id="comment"
                                v-slot="{ field }"
                                v-model="form.comment"
                                name="comment"
                                :disabled="submitting"
                                rules="isRequired">
                                <textarea
                                    v-bind="field"
                                    :disabled="submitting"
                                    type="textarea"
                                    placeholder="Your Message"
                                    class="w-full px-3 py-2 placeholder-base-200 bg-neutral rounded outline-none text-white h-32" />
                            </Field>
                            <ErrorMessage
                                v-slot="{ message }"
                                name="comment">
                                <span class="text-error text-xs">
                                    {{ message }}
                                </span>
                            </ErrorMessage>
                        </div>

                        <div class="mb-6 text-center">
                            <button
                                class="w-full px-4 py-2 rounded text-white bg-accent hover:bg-base-200 transition-colors"
                                :disabled="submitting"
                                type="submit">
                                Send
                            </button>
                        </div>
                        <div
                            v-if="successMessage"
                            class="text-success mt-2">
                            {{ successMessage }}
                        </div>
                        <div
                            v-if="errorMessage"
                            class="text-error mt-2">
                            {{ errorMessage }}
                        </div>
                    </Form>
                </div>
            </label>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { ref } from 'vue';

const submitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const form = ref({
    name: '',
    email: '',
    comment: '',
});

defineRule('isRequired', (value: string) => {
    if (value && value.trim()) {
        return true;
    }

    return 'This is required';
});

defineRule('isValidEmail', (value: string) => {
    // Field is empty, should fail
    if (!value || !value.length) {
        return false;
    }

    // Check if email is valid
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(value)) {
        return 'This field must be a valid email';
    }

    return true;
});
const clearForm = () => {
    errorMessage.value = '';
    successMessage.value = '';
    form.value.name = '';
    form.value.email = '';
    form.value.comment = '';
    submitting.value = false;
};

const onSubmit = async (values: {}) => {
    clearForm();
    submitting.value = true;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('An error occurred while submitting the form.');
        }

        clearForm();
        successMessage.value = 'Email sent successfully.';
    } catch (error) {
        clearForm();
        errorMessage.value = 'An error occurred while submitting the form.';
    }
};
</script>
