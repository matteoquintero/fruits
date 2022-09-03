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
                            @input="searchList"
                        >
                        <MenuItem v-if="filterList.length == 0" v-slot="{ active }" v-for="list in lists.slice(0, 10)" @click="selectList(list.name)">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ list.name }}</a>
                        </MenuItem>

                        <MenuItem v-if="filterList.length > 0" v-slot="{ active }" v-for="list in filterList" @click="selectList(list.name)">
                            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ list.name }}</a>
                        </MenuItem>
                        <small v-if="filterList.length > 0" class="text-center block text-fruit-200">Showing {{ filterList.length}} of {{ lists.length }} results</small>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
        <p
          v-if="selectedList"
          class="pt-2 absolute text-fruit-200 w-full flex justify-center items-center "
        >
          You have selected: <span class="font-semibold">{{ selectedList }}</span>
        </p>
      </div>
    </div>
  </template>
<script lang="ts" setup>
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'
    defineProps<{
        lists: List[]
    }>()    
</script>
<script lang="ts" >
    import { defineComponent } from "vue";
    import type List from '@/interfaces/list.interface';

    export default defineComponent({
    data() {
        return {
            filterList: [] as List[],
            selectedList: ''
        };
    },
    methods: {
        selectList(list:string){
            this.selectedList = list
        },        
        searchList(e:any){
            if (e.target.value === '') {
                this.filterList = []
                return
            }
            let matches = 0
            this.filterList = this.lists.filter(list => {
                if (list.name.toLowerCase().includes(e.target.value.toLowerCase()) && matches < 10) {
                    matches++
                    return list
                }
            })
        }
    },
    });
</script>
