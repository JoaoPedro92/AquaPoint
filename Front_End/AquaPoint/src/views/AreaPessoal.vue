<template>
    <div class="spacer"></div>
    <section class="main-container container-spacer">
        <div class="container">
            <div class="spacer"></div>
            <h1 class="main-titles">ÁREA PESSOAL</h1>
            <div class="spacer"></div>
            <div class="spacer"></div>

            <div class="row">
                <div class="col-lg-6 mt-5 mt-lg-0 d-flex flex-column justify-content-center align-items-center position-relative">
                    <label for="upload-image" style="cursor: pointer;">
                        <img :src="profileImage"
                            alt="userimage" 
                            class="user-profile-image" 
                            id="preview">
                    </label>

                    <input type="file" 
                            id="upload-image"
                            accept="image/jpeg, image/png"
                            style="display: none;" @change="onProfileImageChange">
                </div>

                <div class="col-lg-6">
                    <form @submit.prevent="UpdateProfileData">
                        <div class="form-group">
                            <label for="exampleInputEmail1">O seu nome</label>
                            <input type="text" v-model="nameValue" class="form-control contact-form" id="exampleInputEmail1" required>
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="exampleInputEmail1">O seu email</label>
                            <input type="email" v-model="emailValue" class="form-control contact-form" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                            <small id="emailHelp" class="form-text text-muted">Esta informação nunca será partilhada com ninguém.</small>
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" v-model="passwordValue" class="form-control contact-form" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Repetir Password</label>
                            <input type="password" v-model="passwordRepeatValue" class="form-control contact-form" id="exampleInputPassword1" placeholder="Password">
                        </div>
        
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="submit" value="Atualizar" class="btn btn-form" style="width: 95% !important; height: 40px !important; margin-top: 4%; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                            </div>
                        </div>
                    </form>
                </div><!-- Col end -->

                
            </div><!-- Content row end -->

        </div><!-- Container end -->
    </section>

    <section class="main-container container-spacer">
        <div class="container">
            <div class="spacer"></div>
            <h1 class="main-titles">INTERAÇÕES RECENTES</h1>
            <div class="spacer"></div>
            <div class="spacer"></div>
            
            <div class="row">
                <div class="col-lg-12" style="display: inline-block;">
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                    <div class="aquapoint-interaction col-lg-3 aquapoint-interaction-col-lg-custom">
                        <div class="imageArea">
                            <img src="../assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg" alt="aquapoint-interaction">
                        </div>
                        
                        <h1>Bebedouro da praça</h1>
                        <span><b>Tipo de interação</b>: Comentário</span>
                        <br>
                        <span><b>Interação</b>: "O bebedouro está em boas condições, gostei bastante!"</span>
                    
                        <input type="submit" value="Verificar" class="btn btn-form" style="width: 90% !important; position: absolute !important; left: 5% !important; bottom: 5%; height: 35px !important; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                    </div>
                </div>
                
            </div><!-- Content row end -->

        </div><!-- Container end -->
    </section>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useAuth } from '/src/utilities/useAuth';
    import { useToast } from 'vue-toastification';
    import { userService } from '../services/userService';

    const Auth = useAuth()
    const toast = useToast()
    const nameValue = ref(Auth.user.name)
    const emailValue = ref(Auth.user.email)
    const passwordValue = ref('')
    const passwordRepeatValue = ref('')
    const profileImage = ref("/src/assets/images/user_image.png") 


   onMounted(async () => {
     
        profileImage.value = (await userService.getProfilePicture(Auth.user.id)).data
    })

    async function UpdateProfileData(){
        console.log('Name: ' + nameValue.value + '\nEmail: ' + emailValue.value + '\nPassword: ' + passwordValue.value + '\nPassword Repeat: ' + passwordRepeatValue.value)
        const updatedUser = { name: nameValue.value, email: emailValue.value, profilePicture: profileImage.value }
        
        try{
            console.log(profileImage.value)
            await userService.update(Auth.user.id, updatedUser)
            nameValue.value = Auth.user.name
            emailValue.value = Auth.user.email
            passwordValue.value = ''
            passwordRepeatValue.value = ''
            toast.success('Dados atualizados com sucesso.')
        }

        catch(err){
            toast.error(`Erro ao atualizar dados do utilizador: ${err.message}`)
        }
    }

    function onProfileImageChange(e) {
        const file = e.target.files[0]
        if(!file) return
        
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImage.value = e.target.result
        }
        reader.readAsDataURL(file)

    }
</script>

<style scoped>
    @import "/src/assets/css/style.css";
</style>    