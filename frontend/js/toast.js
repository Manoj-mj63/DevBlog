function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.className = "";

    if(type === "error"){

        toast.style.background = "#ef4444";

    }else if(type === "warning"){

        toast.style.background = "#f59e0b";

    }else{

        toast.style.background = "#22c55e";

    }

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}