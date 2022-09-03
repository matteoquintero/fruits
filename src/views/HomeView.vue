<script setup lang="ts">
import Dropdown from '@/components/Dropdown.vue'
</script>

<template>
  <main>
   <Dropdown :lists="fruits"/>
  </main>
</template>

<script lang="ts" >
  import Fruitservice from "@/services/fruit.service";
  import { defineComponent } from "vue";
  import type Fruit from "@/interfaces/list.interface";
  import type ResponseData from "@/interfaces/response-data.interface";

  export default defineComponent({
  data() {
      return {
          fruits: [] as Fruit[]
      };
  },
  methods: {
      loadFruits() {
          Fruitservice.get()
          .then((response: ResponseData) => {
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
