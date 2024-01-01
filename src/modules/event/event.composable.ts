import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import { onMounted, ref } from 'vue'
import type { EventsModel } from './models/events.model'
import { Events } from './entities/events'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { EventModel } from './models/event.model'
import { eventController } from './event.di'
import type { CreateEventDto } from './dto/create-event.dto'
import type { UpdateEventDto } from './dto/update-event.dto'

export const useEvent = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const events = ref<EventsModel>(Events.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedEvent = ref<Maybe<EventModel>>(Maybe.none())

  const selectEvent = async (uuid: string) => {
    const event = await eventController.findOne(uuid)
    selectedEvent.value = Maybe.some(event)
  }

  const cleanSelectEvent = () => {
    selectedEvent.value = Maybe.none()
  }

  const getEvents = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await eventController.findAll(findAllOptions.value)
    events.value = response.events
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createEvent = async (options: CreateEventDto) => {
    await eventController.create(options)
    await getEvents()
  }

  const updateEvent = async (uuid: string, options: UpdateEventDto) => {
    await eventController.update(uuid, options)
    await getEvents()
  }

  const deleteEvent = async (uuid: string) => {
    await eventController.delete(uuid)
    await getEvents()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getEvents()
  })

  return {
    selectedEvent,
    events,
    totalElement,
    totalPage,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    cleanSelectEvent
  }
}
