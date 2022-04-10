import { CustomDivElement, IToastOptions } from "src/app/models/config";
import "./snackbar.css";

export default class ToastMaker {
  constructor() {
    if (document.readyState === "complete") {
      this.init();
    } else {
      window.addEventListener("DOMContentLoaded", this.init);
    }
  }

  init() {
    if(document.getElementById("toastnotify-container")) return
    
    const container = document.createElement("div");
    container.id = "toastnotify-container";
    document.body.appendChild(container);
  }

  idIncremental = 0;

  create(options: IToastOptions) {
    const toast: CustomDivElement = document.createElement("div");
    toast.id = "toast-" + `${++this.idIncremental}`;

    if (options.animationIn) {
      toast.className = "toastnotify animated " + options.animationIn;
    } else {
      toast.className = "toastnotify animated fadeInRight";
    }

    const containertoast = document.createElement("div");
    containertoast.className = "vh";
    toast.appendChild(containertoast);

    //image
    if (options.image) {
      const containerimage = document.createElement("span");
      containerimage.className = "b4cimg";
      containertoast.appendChild(containerimage);
      const img = document.createElement("img");
      img.src = options.image;
      img.className = "bAimg";
      containerimage.appendChild(img);
      if (options.important) {
        const important = document.createElement("i");
        important.className = "important";
        containerimage.appendChild(important);
      }
    }

    //add icon
    if (options.icon) {
      const containericono = document.createElement("span");
      containericono.className = "b4cicon";
      containertoast.appendChild(containericono);
      const icono = document.createElement("i");
      icono.className = options.icon;
      containericono.appendChild(icono);
      if (options.important) {
        const importanticon = document.createElement("i");
        importanticon.className = "important";
        containericono.appendChild(importanticon);
      }
    }

    // descripcion texto
    const p = document.createElement("span");
    p.className = "bAq";
    if (options.text) {
      p.innerHTML = options.text;
    }
    containertoast.appendChild(p);

    const buttoncontainer = document.createElement("span");
    buttoncontainer.className = "bAo";
    containertoast.appendChild(buttoncontainer);

    //button ok

    if (typeof options.callbackOk === "function") {
      const buttonOK = document.createElement("span");
      if (options.buttonOk) {
        buttonOK.innerHTML = options.buttonOk;
      } else {
        buttonOK.innerHTML = "OK";
      }
      buttonOK.className = "a8k";
      buttoncontainer.appendChild(buttonOK);

      buttonOK.addEventListener("click", (event) => {
        event.stopPropagation();
        options.callbackOk.call(removeToastnotify());
      });
    }

    //botton cancelar

    if (typeof options.callbackCancel === "function") {
      const buttonCancel = document.createElement("span");
      if (options.buttonCancel) {
        buttonCancel.innerHTML = options.buttonCancel;
      } else {
        buttonCancel.innerHTML = "Exit";
      }
      buttonCancel.className = "a8k";
      buttoncontainer.appendChild(buttonCancel);

      buttonCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        options.callbackCancel.call(removeToastnotify());
      });
    }

    //botton cerrar notificacion
    const contenedorClose = document.createElement("div");
    contenedorClose.className = "bBe";
    containertoast.appendChild(contenedorClose);

    const buttonClose = document.createElement("div");
    buttonClose.className = "bBf";
    contenedorClose.appendChild(buttonClose);

    contenedorClose.addEventListener("click", (event) => {
      event.stopPropagation();
      removeToastnotify();
    });

    toast.hide = () => {
      if (options.animationIn) {
        toast.classList.remove(options.animationIn);
      } else {
        toast.classList.remove("fadeInRight");
      }

      if (options.animationOut) {
        toast.classList.add(options.animationOut);
      } else {
        toast.classList.add("fadeOutRight");
      }
      window.setTimeout(() => {
        toast.remove();
      }, 2000);
    };

    // auto close
    if (options.duration) {
      window.setTimeout(toast.hide, options.duration);
    }

    if (options.rounded) {
      toast.className += " rounded";
    }

    if (options.type) {
      toast.className += " toastnotify-" + options.type;
    } else {
      toast.className += " toastnotify-default";
    }

    if (options.classes) {
      toast.className += " " + options.classes;
    }

    function removeToastnotify(): void {
      if (options.animationIn) {
        toast.classList.remove(options.animationIn);
      } else {
        toast.classList.remove("fadeInRight");
      }

      if (options.animationOut) {
        toast.classList.add(options.animationOut);
      } else {
        toast.classList.add("fadeOutRight");
      }
      window.setTimeout(
        function () {
          toast.remove();
        }.bind(this),
        1000
      );
    }

    document.getElementById("toastnotify-container").appendChild(toast);
    return toast;
  }
}
