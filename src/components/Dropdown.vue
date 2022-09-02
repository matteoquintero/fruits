<template>
    <div class="bg-fruit-100 min-w-screen min-h-screen flex justify-center items-start">
      <div class="max-w-xs relative space-y-3">
        <Menu as="div" class="relative inline-block text-left w-56 pt-10 h-14">
            <div>
                <MenuButton class="shadow-lg inline-flex w-full h-14 items-center justify-between rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span class="text-fruit-200">Select an item</span>
                    <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 " aria-hidden="true" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="w-full absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <input
                            type="text"
                            id="search"
                            placeholder="This is a search input"
                            class="p-3 mb-0.5 w-full border-gray-300 rounded"
                            autocomplete="off"
                            @input="searchFruits"
                        >
                        <MenuItem v-if="filterFruits.length == 0" v-slot="{ active }" v-for="fruit in startFruits" @click="selectFruit(fruit.name)">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ fruit.name }}</a>
                        </MenuItem>

                        <MenuItem v-if="filterFruits.length > 0" v-slot="{ active }" v-for="fruit in filterFruits" @click="selectFruit(fruit.name)">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ fruit.name }}</a>
                        </MenuItem>
                        <small v-if="filterFruits.length > 0" class="text-center block text-fruit-200">Showing {{ filterFruits.length}} of {{ fruits.length }} results</small>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
        <p
          v-if="selectedFruit"
          class="pt-2 absolute text-fruit-200 w-full flex justify-center items-center "
        >
          You have selected: <span class="font-semibold">{{ selectedFruit }}</span>
        </p>
      </div>
    </div>
  </template>
<script lang="ts" setup>
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'
</script>
<script lang="ts" >
    import type Fruit from "@/interfaces/fruit.interface";
    import type ResponseData from "@/interfaces/response-data.interface";
    import Fruitservice from "@/services/fruit.service";
    import { defineComponent } from "vue";

    export default defineComponent({
    data() {
        return {
            fruits: [] as Fruit[],
            filterFruits: [] as Fruit[],
            startFruits: [] as Fruit[],
            selectedFruit: ''
        };
    },
    methods: {
        cleanFruits(){
            this.fruits = []
        },
        selectFruit(fruit:string){
            this.selectedFruit = fruit
        },        
        searchFruits(e:any){
            if (e.target.value === '') {
                this.filterFruits = []
                return
            }
            let matches = 0
            this.filterFruits = this.fruits.filter(fruit => {
                if (fruit.name.toLowerCase().includes(e.target.value.toLowerCase()) && matches < 10) {
                    matches++
                    return fruit
                }
            })
    

        },              
        loadFruits() {
            Fruitservice.get()
            .then((response: ResponseData) => {
                this.fruits = response.data.data.fruits.map((currentValue: any, index: any) => {
                    return {
                        id: index,
                        name: currentValue,
                    };
                });
                this.startFruits = this.fruits.slice(0, 10);
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
