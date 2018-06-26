<template>
  <Page class="page">
    <ActionBar class="action-bar" title="My Song"/>

    <AbsoluteLayout backgroundColor="#FFFFFF">

      <StackLayout left="20" top="100" width="88%" style="padding: 10%" backgroundColor="#F2F2F2">
        <Label textWrap="true" >
          <FormattedString>
            <Span text="Repertório Musical" fontSize="30" />
          </FormattedString>
        </Label>
        <Label textWrap="true" >
          <FormattedString>
            <Span text="Pesquise pela letras das canções e curta com seus amigos nos melhores momentos de lazer.
" fontSize="17" />
          </FormattedString>
        </Label>
        <Button text="COMECE AGORA" @tap="goTo" />
      </StackLayout>


    </AbsoluteLayout>

  </Page>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      goTo () {
          this.$router.push('/searching')
      }
    }
  }
</script>
