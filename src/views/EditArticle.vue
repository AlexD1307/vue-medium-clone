<template>
  <div>
    <Loading v-if="isLoading" />
    <ArticleForm v-if="initialValue"
                 :initial-value="initialValue"
                 :errors="validationErrors"
                 :isSubmitting="isSubmitting"
                 @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import Loading from '@/components/Loading'

export default {
  name: 'EditArticle',
  components: {Loading, ArticleForm},
  computed: {
    ...mapState({
      article: state => state.editArticle.article,
      isLoading: state => state.editArticle.isLoading,
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors
    }),
    initialValue() {
      if (!this.article) {
        return null
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store.dispatch(actionTypes.updateArticle, {slug, articleInput})
        .then(article => this.$router.push({name: 'article', params: {slug: article.slug}}))
    }
  }
}
</script>
