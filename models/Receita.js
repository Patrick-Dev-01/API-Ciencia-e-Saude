const mongoose = require("mongoose");

// collections de receitas
   /*
   Nome
   ingredientes []
   preparo []
   */

mongoose.model("Receita", {
    id: { type: Number, default: 0},

    nome: {
        type: String
    },

    image: {
        type: String
    },

    ingredientes: {
        type: Array
    },

    preparo: {
        type: Array
    }
});
