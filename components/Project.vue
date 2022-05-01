<template>
    <article @click="$emit('click')" class="flex valign-center align-between quwi--project-container full-w flex-wrap">
        <div class="flex valign-center flex-wrap">
            <figure class="quwi--logo-container">
                <img :src="img" alt="Project image/logo">
            </figure>
            <h3 class="quwi--project-title">{{ title }}</h3>
        </div>
        <div class="flex valign-center align-between flex-wrap">
            <template v-if="status">
                <p class="active status">ACTIVE</p>
            </template>
            <template v-else>
                <p class="rejected status">REJECTED</p>
            </template>
            <div>
                <ul class="time-list">
                    <li>
                        <!-- Api is not providing this data -->
                        <span>time this week</span>
                        <time>{{ secondsToHours(weeklyTime).format('HH:mm:ss') }}</time>
                    </li>
                    <li>
                        <!-- Api is not providing this data -->
                        <span>this month</span>
                        <time>{{ secondsToHours(monthlyTime).format('HH:mm:ss') }}</time>
                    </li>
                    <li>
                        <span>total</span>
                        <time>{{ secondsToHours(totalTime).format('HH:mm:ss') }}</time>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        img: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'No project title :('
        },
        status: {
            type: [Boolean, Number],
            default: false
        },
        totalTime: {
            type: Number,
            default: 0
        },
        monthlyTime: {
            type: Number,
            default: 0
        },
        weeklyTime: {
            type: Number,
            default: 0
        }
    },
    methods: {
        secondsToHours(date) {
            return moment(date, 'seconds');
        }
    }
}
</script>

<style scoped>
.quwi--project-container {
    padding: 0 30px;
    max-width: 800px;
    box-shadow: 0 2px 5px rgba(0,104,166,.25);
    border-radius: 10px;
    cursor: pointer;
}

.quwi--logo-container {
    margin-right: 20px;
    width: 150px;
    height: 150px;
}

.quwi--project-title {
    display: flex;
}

.status {
    font-size: 20px;
    font-weight: bold;
    width: 120px;
}

.active.status {
    color: green;
}

.rejected.status {
    color: red;
}

.time-list li {
    display: flex;
    justify-content: space-between;
}

.time-list li time {
    margin-left: 20px;
}
</style>