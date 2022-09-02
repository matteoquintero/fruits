
<template>
    <div>
        <div v-if="!fruits">Loading Please wait...</div>
        <div v-else v-for="item in fruits">
            <strong>{{ item.id }}</strong>
            <small>{{ item.name }}</small>
        </div>
    </div>
</template>

<script lang="ts" >
    import type Fruit from "@/interfaces/fruit.interface";
    import type ResponseData from "@/interfaces/response-data.interface";
    import Fruitservice from "@/services/fruit.service";
    import { defineComponent } from "vue";
    export default defineComponent({
    data() {
        return {
            fruits: [] as Fruit[],
            counter: 1,
            hiddeButtonOdd: false,
            hiddeButtonEven: false
        };
    },
    methods: {
        cleanFruits(){
            this.fruits = []
        },        
        loadFruits() {
            this.hiddeButtonEven = false
            this.hiddeButtonOdd = false
            Fruitservice.get()
            .then((response: ResponseData) => {
                console.log(response,'response')
                this.fruits = response.data.data.fruits.map((currentValue: any, index: any) => {
                return {
                    id: index,
                    name: currentValue,
                };
            });

            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
    },
    mounted() {
        this.loadFruits();
    },
    });
</script>
