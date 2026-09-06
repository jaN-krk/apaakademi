export {}

declare module "*.glb" {
  const src: string
  export default src
}

declare module "meshline" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const MeshLineGeometry: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const MeshLineMaterial: any
}
