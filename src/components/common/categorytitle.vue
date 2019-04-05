<template>
        <div class="text-center line-style">
                <h3>{{title}}</h3>
                <img src="../../static/images/line.png">
        </div>
</template>
<script>
     export default {
        props:['title']
     }
</script>
<style scoped>
.line-style {
    margin: 20px 0px;
}

.line-style img{
    width: 100%;
    color: #333;
}

.text-center {
    text-align: center;
}

.text-center h3{
    font-size: 1.2em;
    /*color: #ffc428;*/
    color: #333;
    text-shadow:1px 1px 1px #333;
}


</style>