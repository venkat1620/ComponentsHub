import { Component, OnInit, ContentChild, ElementRef, Renderer2, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomInputHostDirective } from './custom-input-host.directive';
@Component({
  selector: 'num-pad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css'],
})
export class NumpadComponent implements OnInit, AfterContentInit {

  @Input() public numValue: string;
  @Output() public numValueChange: EventEmitter<string>;
  @Input() public adjustMaxHeight: number;

  oldNumValue: string;

  keyValues: any[] = [
    { value: '1', disable: false },
    { value: '2', disable: false },
    { value: '3', disable: false },
    { value: '4', disable: false },
    { value: '5', disable: false },
    { value: '6', disable: false },
    { value: '7', disable: false },
    { value: '8', disable: false },
    { value: '9', disable: false },
    { value: '.', disable: false },
    { value: '0', disable: false },
    { value: '/', disable: false }];

  isNotNumBtn: boolean;

  showCustomKeyboard: boolean;

  textCaretStartPosition: number;

  startPosition: number;

  textCaretEndPosition: number;

  @ContentChild('inputEl') inputEl: ElementRef;

  private inputElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2,
    private customInputDir: CustomInputHostDirective) {
    this.numValueChange = new EventEmitter<string>();
  }

  ngOnInit() {
    this.isNotNumBtn = true;
    this.showCustomKeyboard = false;
    this.numValue = this.numValue || '';
    this.oldNumValue = '';
    this.adjustMaxHeight = this.adjustMaxHeight || 35;
  }

  ngAfterContentInit() {
    this.inputElement = this.inputEl.nativeElement;
    this.renderer.listen(this.inputElement, 'click', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(this.inputElement, 'touchend', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(this.inputElement, 'select', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(window, 'orientationchange', () => {
      this.customInputDir.removeHostStyle();
      this.findPositionOfInputEl();
    });
    this.renderer.setAttribute(this.inputElement, 'readonly', 'readonly');
  }

  setInputValue(key) {
    this.changeInputValue(this.startPosition, 0, key);
    this.startPosition = this.startPosition + 1;
  }

  delete() {
    if (this.startPosition > 0 || this.textCaretStartPosition !== this.textCaretEndPosition) {
      (this.textCaretStartPosition === this.textCaretEndPosition) ?
        (this.changeInputValue(this.startPosition - 1, 1, null), this.startPosition = this.startPosition - 1) :
        (this.changeInputValue(this.startPosition, this.textCaretEndPosition - this.startPosition, null),
          this.startPosition = this.startPosition);
      this.textCaretStartPosition = this.startPosition;
      this.textCaretEndPosition = this.startPosition;
    }
  }

  changeInputValue(startPosition, spliceNos, value) {
    const numValueArr = Array.from(this.numValue);
    numValueArr.splice(startPosition, spliceNos, value);
    this.numValue = numValueArr.join('');
    this.numValueChange.emit(this.numValue);
  }

  confirm() {
    this.showCustomKeyboard = false;
    this.customInputDir.removeHostStyle();
  }

  setTextCaretPostion() {
    this.textCaretStartPosition = this.inputElement.selectionStart;
    this.startPosition = this.textCaretStartPosition;
    this.textCaretEndPosition = this.inputElement.selectionEnd;
  }

  cancel() {
    this.numValue = this.oldNumValue;
    this.showCustomKeyboard = false;
    this.customInputDir.removeHostStyle();
    this.numValueChange.emit(this.numValue);
  }

  toggleKeyBoard(event: Object) {
    if (event) {
      if (event['value'] === true && this.showCustomKeyboard) {
        this.showCustomKeyboard = false;
        this.customInputDir.removeHostStyle();
      } else if (event['value'] === false && !this.showCustomKeyboard) {
        this.showCustomKeyboard = true;
        this.oldNumValue = this.numValue;
        this.findPositionOfInputEl();
        console.log('find postion');
      }
    }
  }

  findPositionOfInputEl() {
    setTimeout(() => {
      const inputRect = this.inputElement.getBoundingClientRect();
      const numpadContainerEl = this.elRef.nativeElement.querySelector('#numpadContainer');
      if (numpadContainerEl) {
        const numpadContainerElRect = numpadContainerEl.getBoundingClientRect();
        if ((inputRect.bottom + 20) >= numpadContainerElRect.top) {
          let maxHeight = (numpadContainerElRect.top - this.adjustMaxHeight) - this.customInputDir.getHostTop();
          (maxHeight <= inputRect.height + 20) ? (maxHeight = inputRect.height + 20) : (maxHeight = maxHeight);
          this.customInputDir.setHostStyle(maxHeight);
          this.inputElement.scrollIntoView();
        }
      }
    });
  }
}
