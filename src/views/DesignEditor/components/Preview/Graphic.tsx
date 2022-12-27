import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { Button } from "baseui/button"
import Download from "~/components/Icons/Download"

const Graphic = () => {
  const editor = useEditor()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    image: "",
  })

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  const downLoadPNG = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      
      const a = document.createElement("a")
      a.href = image;
      a.download = "akshay.png"
      a.click()    
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }}>
      {!loading && <img width="auto" height="100%" src={state.image} />}
      {!loading && <Button             size="compact"
            onClick={() => downLoadPNG()}
          ><Download size={24}/></Button>}
    </Block>
  )
}

export default Graphic
