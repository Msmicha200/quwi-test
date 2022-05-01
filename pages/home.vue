<template>
    <div class="full-w">
        <section class="container flex dir-col valign-center">
            <Project v-for="(project, idx) of projects" 
            @click="openEditProject(idx)"
            :key="idx"
            :title="project.name"
            :status="project.is_active" 
            :img="project.logo_url"
            :totalTime="project.spent_sec_all_time" />
        </section>
        <Modal :active="activeModal" @close="activeModal = false">
            <div class="flex dir-col valign-end">
                <Input v-model="$v.editable.name.$model"
                :invalid="$v.editable.name.$error"
                placeholder="Type project title" />
                <DefaultButton class="accept-title-button" @click="acceptProjectEdit">Accept</DefaultButton>
            </div>
        </Modal>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            projects: [],
            activeModal: false,
            editable: {
                idx: null,
                name: null
            }
        }
    },
    middleware: ['authed'],
    validations() {
        const validations = {
            editable: {
                name: {
                    required,
                    minLength: minLength(3)
                }
            }
        };

        return validations;
    },
    async asyncData({ $axios }) {
        const returnObject = {};
        const projects = await $axios.get('/projects-manage/index?filters[is_active]=1&sort=dta_create', {
            headers: {
                // 'Authorization': 'Bearer a00e0064d009e4381c04a5bb8ce1b2d4'
            }
        });

        if (projects.data.projects.length) {
            returnObject.projects = projects.data.projects;
        }

        return returnObject;
    },
    mounted() {
        console.log(this.$auth)
    },
    methods: {
        openEditProject(idx) {
            this.editable.name = this.projects[idx].name;
            this.editable.id = this.projects[idx].id;
            this.editable.idx = idx;
            this.activeModal = true;
        },
        acceptProjectEdit() {
            this.$v.editable.$touch();

            if (this.$v.editable.$anyError) {
                return false;
            }

            this.$axios.post(`/projects-manage/update?id=${this.editable.id}`, {
                name: this.$v.editable.name.$model
            }, {
                headers: {
                    'Authorization': 'Bearer a00e0064d009e4381c04a5bb8ce1b2d4'
                }
            })
            .then(result => {
                this.projects[this.editable.idx].name = this.$v.editable.name.$model;
                this.activeModal = false;
            })
            .catch(err => {
                console.log(err.response.data);
            })
        }
    }
}
</script>

<style scoped>
.quwi--project-container {
    margin-top: 40px;
}

.accept-title-button {
    margin-top: 20px;
}
</style>