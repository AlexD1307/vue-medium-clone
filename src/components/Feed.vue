<template>
  <div>
    <Loading v-if="isLoading" />
    <ErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <AddToFavorites
              :isFavorited="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <TagList :tags="article.tagList" />
        </router-link>
      </div>
      <Pagination
        :total="feed.articlesCount"
        :limit="LIMIT"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>

import {actionTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import Pagination from '@/components/Pagination'
import {LIMIT} from '@/helpers/constants'
import {parseUrl, stringify} from 'query-string'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import TagList from '@/components/TagList'
import AddToFavorites from '@/components/addToFavorites'

export default {
  name: 'Feed',
  components: {AddToFavorites, TagList, ErrorMessage, Loading, Pagination},
  data() {
    return {
      LIMIT,
    }
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * LIMIT - LIMIT
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        LIMIT,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiWithParams})
    }
  }
}
</script>
