import { EditForm } from "@/components/movieForms"

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditForm movieId={params.id} />
}
