import FullLayout from './Full'
import EmbedLayout from './Embed'
import useConfig from '../../hooks/useConfig'

const DynamicLayout = (props) => {
  const { layout } = useConfig()

  switch (layout) {
    case 'embed':
      return <EmbedLayout>{props.children}</EmbedLayout>
    case 'full':
    default:
      return <FullLayout>{props.children}</FullLayout>
  }
}

export default DynamicLayout