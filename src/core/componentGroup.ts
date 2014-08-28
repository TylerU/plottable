///<reference path="../reference.ts" />

module Plottable {
export module Component {
  export class Group extends Abstract.ComponentContainer {

    /**
     * Constructs a GroupComponent.
     *
     * A GroupComponent is a set of Components that will be rendered on top of
     * each other. When you call Component.merge(Component), it creates and
     * returns a GroupComponent.
     *
     * @constructor
     * @param {Component[]} components The Components in the Group (default = []).
     */
    constructor(components: Abstract.Component[] = []){
      super();
      this.classed("component-group", true);
      components.forEach((c: Abstract.Component) => this._addComponent(c));
    }

    public _requestedSpace(offeredWidth: number, offeredHeight: number): _ISpaceRequest {
      var requests = this._components.map((c: Abstract.Component) => c._requestedSpace(offeredWidth, offeredHeight));
      return {
<<<<<<< HEAD
        width : isEmpty ? 0 : d3.max(requests, (request: _ISpaceRequest) => request.width ),
        height: isEmpty ? 0 : d3.max(requests, (request: _ISpaceRequest) => request.height),
        wantsWidth : isEmpty ? false : requests.map((r: _ISpaceRequest) => r.wantsWidth ).some((x: boolean) => x),
        wantsHeight: isEmpty ? false : requests.map((r: _ISpaceRequest) => r.wantsHeight).some((x: boolean) => x)
=======
        width : Util.Methods.max(requests, (request: ISpaceRequest) => request.width ),
        height: Util.Methods.max(requests, (request: ISpaceRequest) => request.height),
        wantsWidth : requests.map((r: ISpaceRequest) => r.wantsWidth ).some((x: boolean) => x),
        wantsHeight: requests.map((r: ISpaceRequest) => r.wantsHeight).some((x: boolean) => x)
>>>>>>> develop
      };
    }

    public merge(c: Abstract.Component): Group {
      this._addComponent(c);
      return this;
    }

    public _computeLayout(xOrigin?: number,
                          yOrigin?: number,
                   availableWidth?: number,
                  availableHeight?: number): Group {
      super._computeLayout(xOrigin, yOrigin, availableWidth, availableHeight);
      this._components.forEach((c) => {
<<<<<<< HEAD
        c._computeLayout(0, 0, this._availableWidth, this._availableHeight);
=======
        c._computeLayout(0, 0, this.width(), this.height());
>>>>>>> develop
      });
      return this;
    }

    public _isFixedWidth(): boolean {
      return this._components.every((c) => c._isFixedWidth());
    }

    public _isFixedHeight(): boolean {
      return this._components.every((c) => c._isFixedHeight());
    }
  }
}
}
