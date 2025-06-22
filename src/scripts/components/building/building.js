import {
  DRACOLoader,
  GLTFLoader,
  KTX2Loader,
} from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

async function loadBuilding(renderer) {
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/"
    )
    .detectSupport(renderer);

  const loader = new GLTFLoader()
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder);

  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  dracoLoader.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(dracoLoader);
}
