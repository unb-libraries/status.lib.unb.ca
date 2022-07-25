import { useSearchParams } from 'react-router-dom'

import FullLayout from './Full'
import EmbedLayout from "./Embed"

const DynamicLayout = (props) => {
  const [params, _] = useSearchParams()
  const layout = params.get('layout')

  switch (layout) {
    case 'embed':
      return <EmbedLayout>{props.children}</EmbedLayout>
    case 'full':
    default:
      return <FullLayout>{props.children}</FullLayout>
  }
}

export default DynamicLayout