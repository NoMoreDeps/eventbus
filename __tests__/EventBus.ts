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

  it("Should allow to subscribe", () => {
    const evb = new EventBus();

    expect(() => {
      evb.on("A.B.C", () => void 0);
    }).not.toThrowError();

    expect(() => {
      evb.on("A.B", () => void 0);
    }).not.toThrowError();

    expect(() => {
      evb.on("A", () => void 0);
    }).not.toThrowError();

    expect(() => {
      evb.on(void 0, void 0);
    }).toThrow(`The event name is not in the correct format : 
Should be in '3' parts 
separated by '.'`);

    evb.depthLevel = 1;

    expect(() => {
      evb.on(void 0, void 0);
    }).toThrow(`The event name is not in the correct format : 
Should be in '1' part`);
  });
});