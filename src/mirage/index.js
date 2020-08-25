import { Server, createServer } from "miragejs";

export let MirageServer = () => {
  var arr = [{ id: 1, name: "Bob" }];
  createServer({
    routes() {
        this.namespace = "/fakeapi"
      this.get("/users", { users: arr });
      this.post("/addTodo", (res, req) => {
        console.log("req", req);
        res.db._collections.push(req.requestBody)
        arr.push(req.requestBody);
      });

      this.delete("/delete/:id", (res, req) => {
        console.log("delete", req,"res ==", res.db._collections);
        arr.map((val, key) => {
          if (val.id == req.params.id) {
            arr.splice(key, 1);
            return;
          }
        });
      });

      this.put("/update/:id", (_, req) => {
        console.log("update", req);
        arr.map((val, key) => {
          if (val.id == req.params.id) {
            arr[key] = {id:req.params.id, name:req.requestBody.name};
            return;
          }
        });
      });
    },
  });

  //   let server = new Server();
  // //   server.get("/api/users", { users: arr });
  //   server.post("/addTodo", (_, req) => {
  //     console.log("req", req);
  //     arr.push(req.requestBody);
  //   });

  //   server.delete("/delete/:id", (_, req) => {
  //     console.log("delete", req);
  //     arr.map((val, key) => {
  //       if (val.id == req.params.id) {
  //         arr.splice(key, 1);
  //         return
  //       }
  //     });
  //   });

  //   server.put("/update/:id", (_, req) => {
  //     console.log("update", req);
  //     arr.map((val, key) => {
  //       if (val.id == req.params.id) {
  //         arr[key] = req.requestBody
  //         return
  //       }
  //     });
  //   });
};
