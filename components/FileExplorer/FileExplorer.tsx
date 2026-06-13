"use client"
import { useState } from "react"
import styles from "./FileExplorer.module.css"
import { VscFolder, VscFolderOpened, VscFile } from "react-icons/vsc"

type Node = {
  type: "folder" | "file"
  name: string
  children?: Node[]
}

const demoTree: Node[] = [
  {
    type: "folder",
    name: "app",
    children: [
      { type: "folder", name: "(auth routes)", children: [{ type: "folder", name: "sign-in" }, { type: "folder", name: "sign-up" }] },
      { type: "folder", name: "(private routes)", children: [{ type: "folder", name: "notes" }, { type: "folder", name: "profile" }] },
      {
        type: "folder",
        name: "api",
        children: [
          { type: "folder", name: "auth" },
          { type: "folder", name: "notes" },
          { type: "folder", name: "users" },
          { type: "file", name: "api.ts" },
        ],
      },
    ],
  },
  { type: "folder", name: "components" },
  { type: "folder", name: "lib" },
  { type: "folder", name: "public" },
  { type: "file", name: "package.json" },
]

function TreeNode({ node, level = 0 }: { node: Node; level?: number }) {
  const [open, setOpen] = useState(false)

  if (node.type === "folder") {
    return (
      <div className={styles.node} style={{ paddingLeft: `${level * 12}px` }}>
        <div className={styles.row} onClick={() => setOpen(!open)}>
          <span className={styles.icon}>{open ? <VscFolderOpened /> : <VscFolder />}</span>
          <span className={styles.name}>{node.name}</span>
        </div>
        {open && node.children && (
          <div className={styles.children}>
            {node.children.map((child, i) => (
              <TreeNode node={child} key={i} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.node} style={{ paddingLeft: `${level * 12}px` }}>
      <div className={styles.row}>
        <span className={styles.icon}><VscFile /></span>
        <span className={styles.name}>{node.name}</span>
      </div>
    </div>
  )
}

export default function FileExplorer() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Files</div>
      <div className={styles.tree}>
        {demoTree.map((node, i) => (
          <TreeNode node={node} key={i} />
        ))}
      </div>
    </div>
  )
}
