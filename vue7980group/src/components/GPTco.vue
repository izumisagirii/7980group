<template>
    <br>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">GPT Copilot</h5>
            <input v-model="userInput" type="text" class="form-control" placeholder="input your question">
            <button @click="submitQuestion" class="btn btn-primary mt-3">submit</button>
        </div>
    </div>
    <div class="card mt-3" v-if="gptResponse">
        <div class="card-body">
            <p class="card-text">{{ gptResponse }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInput: '',
            gptResponse: null
        };
    },
    methods: {
        async submitQuestion() {
            if (this.userInput.trim()) {
                this.gptResponse = await this.fetchGPTResponse(this.userInput);
                this.userInput = '';
            }
        },
        async fetchGPTResponse(question) {
            const token = localStorage.getItem('token_my');
            const url = '/api/chat';
            const payload = { 'message': question };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization_my': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data['gptResponse'];
            } catch (error) {
                return `Error: ${error.message}`;
            }
        }

    }
};
</script>
