<template>
    <div class="container">
        <h2>Todo App</h2>
        <br />
        <div class="input">
            <input type="text" v-model="newTodoItem">
            <button type="button" class="btn-info" @click="onClickSave">Create</button>
        </div>
        <br />
        <table class='table table-bordered table-strripped table-hover'>
            <thead>
                <tr>
                    <th>Todo</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody v-for="item in items" :key="item.id">
                <tr>
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        <button class='btn btn-danger' @click="onClickDelete(item.id)"> Delete </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newTodoItem: '',
                items: []
            }
        },
        async mounted() {
            await this.loadItems()
        },
        methods: {
            async onClickSave() {
                await fetch('http://localhost:5000/api/Todos', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: this.newTodoItem })
                })
                this.newItemText = ''
                await this.loadItems()
            },
            async loadItems() {
                const res = await fetch('http://localhost:5000/api/Todos')
                this.items = await res.json()
            },
            async onClickDelete(id) {
                await fetch(`http://localhost:5000/api/Todos/${id}`, {
                    method: 'DELETE'
                })
                await this.loadItems()
            }
        }
    }
</script>