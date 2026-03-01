<template>
    <div class="spacer"></div>
    <section class="main-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    
                    <h3 class="main-titles">CONTACTOS</h3>

                    <br>
                    <b>Morada:</b>
                    <br>
                    Rua x,y,z, 2222-222 Lisboa
                    <br><br>

                    <b>Telemóvel:</b>
                    <br>
                    +351 951 123 321
                    <br><br>

                    <b>Email:</b> 
                    <br>
                    aquapoint@gmail.com
                    <br>
                    
                    
                </div>

                <div class="col-lg-6 mt-5 mt-lg-0">
                
                    <h3 class="main-titles">FORMULÁRIO</h3>

                    <form id="contactForm" name="contactForm" class="contactForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="label" for="name"></label>
                                    <input type="text" class="form-control contact-form" name="name" id="name" placeholder="Nome" tabindex="0" required>
                                </div>
                            </div>
                            <div class="col-md-6"> 
                                <div class="form-group">
                                    <label class="label" for="phone"></label>
                                    <input type="number" class="form-control contact-form" name="phone" id="phone" placeholder="Telemóvel" tabindex="0" required>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="label" for="email"></label>
                                    <input type="email" class="form-control contact-form" name="email" id="email" placeholder="Email" tabindex="0" required>
                                </div>
                            </div>
                            <div class="col-md-6"> 
                                <div class="form-group">
                                    <label class="label" for="localization"></label>
                                    <input type="text" class="form-control contact-form" name="localization" id="localization" placeholder="Localidade" tabindex="0" required>
                                </div>
                            </div>
                            
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="label" for="#"></label>
                                    <textarea name="message" class="form-control contact-form" id="message" style="width: 100% !important; resize: none; height: 15vh !important;" cols="30" rows="4" required placeholder="O que é que necessita? Explique o mais detalhadamente possível"></textarea>
                                </div>
                            </div>

                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="submit" value="Enviar" class="btn btn-form" style="width: 100% !important; height: 3.4vh !important; margin-top: 4%; background-color: var(--aquapoint-logo-blue); color: white;" tabindex="0">
                                </div>
                            </div>
                        </div>
                    </form>  
    
                </div>
            </div>
            
            <br>

            <center>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.2102738604317!2d-9.105085123639652!3d38.78181365351522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1934838cfa1033%3A0x36de966c91888246!2sIADE!5e0!3m2!1spt-PT!2spt!4v1772317445933!5m2!1spt-PT!2spt" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </center>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Contacto'
    }
</script>

<style scoped>
    @import "/src/assets/css/style.css";
</style>    