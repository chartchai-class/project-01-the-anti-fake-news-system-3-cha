import { createRouter, createWebHistory } from 'vue-router'
import NewstDetailView from '@/views/news/DetailVeiw.vue'
import NewsVoteView from '@/views/news/VoteView.vue'
import NewsLayoutView from '@/views/news/LayoutView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/NewsService'
import { useEventStore } from '@/stores/new'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
      path: '/news/:id',
      name: 'news-layout-view',
      component: NewsLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then(response => {
            //need to setup the data for the event
            eventStore.setEvent(response.data)
          }).catch(error => {
              if (error.response && error.response.status === 404) {
                return {
                  name: '404-resource-view',
                  params: { resource: 'event' }
                }
              } else {
                return { name: 'network-error-view' }
              }
          })
      },
      children: [
        {
          path: '',
          name: 'news-detail-view',
          component: NewstDetailView,
          props: true
        },
        {
          path: 'vote',
          name: 'news-vote-view',
          component: NewsVoteView,
          props: true
        }
      ]
    },
    {
      path: '/home',
      name: 'home-view',
      component: HomeView
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
