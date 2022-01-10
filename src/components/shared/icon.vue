<template>
    <i class="material-icons cursor-pointer" :class="$attrs.class" @click="$emit('click')">{{$attrs.icon}}</i>
</template>