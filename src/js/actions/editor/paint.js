import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  initialize,
  setContext,
  onClickPaint,
  onMouseDownPaint,
  onMouseUpPaint,
  onMouseMovePaint,

  importImage,
  exportedImage,
  endLoadImage,
  endSaveImage
} = createActions({
  INITIALIZE: (context) => ({
    context: context
  }),
  SET_CONTEXT: (index, context) => ({
    layerIndex: index,
    context: context
  }),

  ON_CLICK_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_DOWN_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_UP_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_MOVE_PAINT: (point) => ({
    point: point
  }),

  IMPORT_IMAGE: (name, url) => ({
    name: name,
    url: url
  }),
  EXPORTED_IMAGE: () => ({
  }),

  END_LOAD_IMAGE: (image) => ({
    image: image
  }),

  END_SAVE_IMAGE: () => ({
  })
});

const canvasToBlob = canvas => {
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob);
    });
  });
};

export const loadImage = id => {
  return dispatch => {
    const request = new Request();
    request.get('/images/' + id, image => {
      let imageLayerCount = 0;
      image.layers.forEach(layer => {
        const request = new Request();
        layer.isVisible = layer.visibility;
        layer.url = request.getUrl('/images/' + id + '/layers/' + layer.id + '/load');
        if (image.layers.length >= ++imageLayerCount) {
          dispatch(endLoadImage(image));
        }
      });
    });
  }
};

export const saveImage = paint => {
  return dispatch => {
    const request = new Request();
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = paint.width;
    exportCanvas.height = paint.height;

    const imageLayers = paint.layers.map((layer, index) => ({
      name: layer.name,
      layer_order: index + 1,
      visibility: layer.isVisible
    }));

    const contextsToBlobs = paint.contexts.map(context => {
      exportCanvas.getContext('2d').drawImage(context.canvas, 0, 0, context.canvas.width, context.canvas.height);
      return canvasToBlob(context.canvas);
    });
    const attachblobs = paintLayersBlobs => {
      paintLayersBlobs.forEach((blob, index) => {
        request.attach("image_layers[" + index + "][image]", blob);
      });
      return canvasToBlob(exportCanvas);
    };
    const postPaint = blob => {
      request.attach('image', blob);
      const data = {
        name: paint.name,
        image_layers: imageLayers
      };
      request.post('/images', data, body => {
        dispatch(endSaveImage(body));
      });
    };

    Promise.all(contextsToBlobs)
      .then(attachblobs)
      .then(postPaint);
  };
};
