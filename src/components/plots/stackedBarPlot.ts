///<reference path="../../reference.ts" />

module Plottable {
export module Plot {

  export class StackedBar extends Abstract.NewStyleBarPlot {
    private stackedData: any[][] = [];
    public _yAccessor: _IAccessor;
    public _isVertical = true;
    public _baselineValue = 0;
    public _baseline: D3.Selection;
    private stackedExtent: number[] = [];

<<<<<<< HEAD
    /**
     * Constructs a StackedBarPlot.
     *
     * A StackedBarPlot is a plot that plots several bar plots stacking on top of each
     * other.
     *
     * @constructor
     * @param {Scale} xScale The x scale to use.
     * @param {Scale} yScale The y scale to use.
     */
    constructor(xScale?: Abstract.Scale, yScale?: Abstract.Scale) {
      super(xScale, yScale);
    }

=======
>>>>>>> develop
    public _addDataset(key: string, dataset: any) {
      super._addDataset(key, dataset);
      this.stackedData = this.stack(this._projectors["y"].accessor);
    }

    public _updateAllProjectors() {
      super._updateAllProjectors();
      if (this._yScale == null) {
        return;
      }
      if (this._isAnchored && this.stackedExtent.length > 0) {
        this._yScale._updateExtent(this._plottableID.toString(), "_PLOTTABLE_PROTECTED_FIELD_STACK_EXTENT", this.stackedExtent);
      } else {
        this._yScale._removeExtent(this._plottableID.toString(), "_PLOTTABLE_PROTECTED_FIELD_STACK_EXTENT");
      }
    }

    public _generateAttrToProjector() {
      var attrToProjector = super._generateAttrToProjector();
      var primaryScale    = this._isVertical ? this._yScale : this._xScale;
      var getY0 = (d: any) => primaryScale.scale(d._PLOTTABLE_PROTECTED_FIELD_Y0);
      var getY = (d: any) => primaryScale.scale(d._PLOTTABLE_PROTECTED_FIELD_Y);
      attrToProjector["height"] = (d) => Math.abs(getY(d) - getY0(d));
      attrToProjector["y"] = (d) => getY(d);
      return attrToProjector;
    }

    private stack(accessor: _IAccessor) {
      var datasets = d3.values(this._key2DatasetDrawerKey);
      var lengths = datasets.map((d) => d.dataset.data().length);
<<<<<<< HEAD
      if (_Util.Methods.uniqNumbers(lengths).length > 1) {
        _Util.Methods.warn("Warning: Attempting to stack data when datasets are of unequal length");
=======
      if (Util.Methods.uniq(lengths).length > 1) {
        Util.Methods.warn("Warning: Attempting to stack data when datasets are of unequal length");
>>>>>>> develop
      }
      var currentBase = _Util.Methods.createFilledArray(0, lengths[0]);
      var stacks = this._getDatasetsInOrder().map((dataset) => {
        var data = dataset.data();
        var base = currentBase.slice();
        var vals = data.map(accessor);
        if (vals.some((x: number) => x<0)) {
          _Util.Methods.warn("Warning: Behavior for stacked bars undefined when data includes negative values");
        }
        currentBase = _Util.Methods.addArrays(base, vals);

        return data.map((d: any, i: number) => {
          d["_PLOTTABLE_PROTECTED_FIELD_Y0"] = base[i];
          d["_PLOTTABLE_PROTECTED_FIELD_Y"] = currentBase[i];
          return d;
        });
      });
      this.stackedExtent = [0, Util.Methods.max(currentBase)];
      this._onDataSourceUpdate();
      return stacks;
    }

    public _paint() {
      var attrHash = this._generateAttrToProjector();
      this._getDrawersInOrder().forEach((d: Abstract._Drawer, i: number) => {
        var animator: Animator.Rect;
        if (this._animate) {
          animator = new Animator.Rect();
          animator.delay(animator.duration() * i);
        }
        d.draw(this.stackedData[i], attrHash, animator);
      });
    }
  }
}
}
