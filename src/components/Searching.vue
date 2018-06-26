<template>
    <Page class="page">
        <ActionBar class="action-bar" title="My Song">
            <NavigationButton text="Voltar" android.systemIcon="ic_menu_back" @tap="goBack"/>
        </ActionBar>

            <ScrollView orientation="vertical">
                <AbsoluteLayout backgroundColor="#FFFFFF">
                    <StackLayout orientation="vertical" left="20" top="20" width="88%" class="mybox">
                        <TextField v-model="txtartist" hint="Artista"/>
                        <TextField v-model="txtmusic" hint="Música"/>
                        <FlexboxLayout flexDirection="row-reverse">
                            <Button text="Pesquisar" alignSelf="flex-end" @tap="findMusic"/>
                            <Button text="Limpar" @tap="reloadData"/>
                        </FlexboxLayout>
                    </StackLayout>
                    <StackLayout orientation="vertical" v-if="result" left="20" top="200" width="88%" class="music">
                        <Label :text="music.name" fontSize="25"/>
                        <HtmlView :html="music.text" />
                    </StackLayout>
                </AbsoluteLayout>
            </ScrollView>

    </Page>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                txtartist: '',
                txtmusic: '',
                result: '',
                music: {
                    name: '',
                    text: ''
                }
            }
        },
        methods: {
            goBack() {
                this.$router.push('/home')
            },
            findMusic() {
                if (this.txtartist && this.txtmusic) {
                    axios.get('https://api.vagalume.com.br/search.php?art=' + this.txtartist + '&mus=' + this.txtmusic + '&apikey={bcd3ff0cd991b534b5c2038f183788c2}')
                        .then(response => {
                            this.result = response.data
                            if (this.result.type === 'exact') {
                                this.music.name = this.result.mus[0].name
                                this.music.text = this.result.mus[0].text
                                    .replace(/(?:\r\n|\r|\n)/g, '<br />')
                            }
                            if (this.result.type === 'song_notfound' || this.result.type === 'notfound') {
                                alert({
                                    title: "Erro",
                                    message: "Não foi possível localizar sua música",
                                    okButtonText: "OK"
                                }).then(() => {
                                    console.log("Alert dialog closed");
                                });
                                this.txtmusic = ''
                                this.txtartist = ''
                            }
                        })
                        .catch(e => {
                            alert({
                                title: "Erro",
                                message: "Falha ao conectar ao servidor, tente novamente mais tarde",
                                okButtonText: "OK"
                            }).then(() => {
                                console.log("Alert dialog closed");
                            });
                        })
                } else {
                    alert({
                        title: "Erro",
                        message: "Os campos Artista e Música são obrigatórios",
                        okButtonText: "OK"
                    }).then(() => {
                        console.log("Alert dialog closed");
                    });
                }
            },
            reloadData () {
                this.txtmusic = ''
                this.txtartist = ''
                this.result = ''
            }
        }
    }
</script>

<style scoped>
    .page {
        background: #ffffff;
    }

    .mybox {
        background: #F2F2F2;
        padding: 15%;
        border-radius: 20px
    }

    .music {
        padding: 80px;
    }

    TextField {
        margin: 20px 0;
    }
</style>
