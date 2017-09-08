import { EventBus } from "../src/EventBus";

describe("EventBus", () => {
  it("Should instanciate", () => {
    const evb = new EventBus();
    expect(evb).toBeDefined();
  });

  it("Should set the separator to '.' if empty", ()=>{
    const evb = new EventBus("");
    expect(evb.separator).toBe(".");

    evb.separator = "";
    expect(evb.separator).toBe(".");    

    evb.separator = "/";
    expect(evb.separator).toBe("/");    
  });

  it("Should set the depth to 1 if < 1", ()=>{
    const evb = new EventBus("", 0);
    expect(evb.depthLevel).toBe(1);

    evb.depthLevel = 0;
    expect(evb.depthLevel).toBe(1);  
    
    evb.depthLevel = 3;
    expect(evb.depthLevel).toBe(3);      
  });
});