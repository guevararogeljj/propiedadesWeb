<template>
       <v-label>Escribe a un asesor</v-label>
      <v-text-field v-model="nombreCompleto" variant="solo" label="Nombre completo"></v-text-field>
      <v-text-field v-model="correoElectronico" variant="solo" label="Correo electrónico"></v-text-field>
      <v-text-field v-model="telefono" variant="solo" label="Teléfono"></v-text-field>
      <v-textarea v-model="mensaje" variant="solo" label="Mensaje"></v-textarea>
    <ButtonSecondary color="primary" Icon="mdi-send" Text="ENVIAR MENSAJE"/>
</template>

<script>
import ButtonSecondary from '@/components/common/ButtonSecondary.vue';
export default {
components: {ButtonSecondary},
}
</script>

<style>

</style> 