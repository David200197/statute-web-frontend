export interface CreateEventDto {
  readonly name: string
  readonly date: string
  readonly campus: string
  readonly sponsors: string
  readonly rapporteurship: string
  readonly photos: File[]
}
