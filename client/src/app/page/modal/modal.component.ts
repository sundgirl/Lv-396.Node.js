import { Component, OnInit, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../../page/common/tasks.service';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FiltersService } from '../common/filters.service';
import { Filter } from '../common/filter';
import { FilterReturnService } from '../common/filter-return.service';
import { FilterOptions } from '../common/filter-options';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [ FilterReturnService ],
})
export class ModalComponent implements OnInit {
  modalForm: FormGroup;
  @Input() task: any;
  @Input() item: any;
  @Input() modalType: string;
  @Output() readonly filterVal = new EventEmitter();
  modalRef: BsModalRef;
  selectedStatus: {};
  users: User[];
  user: User;
  editTask: any;
  filtersAll: Filter[];
  filter: Filter;
  getFilter = new EventEmitter();
  usersIds: [];
  userDropDown: Filter;
  updateTask: boolean;

  constructor(private readonly modalService: BsModalService,
              private readonly tasksService: TasksService,
              private readonly fb: FormBuilder,
              private readonly filtersService: FiltersService,
              private readonly userService: UserService,
              private readonly filterReturnService: FilterReturnService) {
    this.modalForm = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      content: ['', Validators.required],
      excerpt: ['', Validators.required],
      status: this.fb.group({
        name: ['', Validators.required],
        value: ['', Validators.required],
      }),
      assignTo: ['', Validators.required],
      reassigned: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(users => this.createUserDropDown(users));
    this.userService.getUser()
      .subscribe(user => this.user = user);
    this.getFilterStatus();
  }

  private createUserDropDown(users): void {
    this.usersIds = users.map(item => (item._id));
    this.userDropDown = {
      id: 1,
      name: 'assignTo',
      isCalendar: false,
      defaultValue: -1,
      options: this.createUserDropdownOptions(users),
    };
  }

  private createUserDropdownOptions = (users: User[]): FilterOptions[] => {
    let options: FilterOptions[] = users.map(
      (item: User, index: number) =>
      ({
        name: `${item.firstName} ${item.lastName}`,
        value: index,
      })
     );
    options = [{name: 'Choose Users', value: -1}, ...options];

    return options;
  };

  getFilterValUserDropDown = (i: number) => {
    this.userDropDown.defaultValue = i;
  };

  getFilterVal = (i: number) => {
    this.filter.defaultValue = i;
  };

  getFiltersNew(): any {
    this.filtersService.getFilters()
      .subscribe(filtersAll => this.filter = this.editFilter(filtersAll));
  }

  private readonly editFilter = (filtersAll: Filter[]): Filter => {
    const filterElem = {...filtersAll.filter(item => item.id === 1)[0]};
    filterElem.defaultValue = this.task.status.value;
    filterElem.options = filterElem.options.filter(item => item.value > -1);

    return filterElem;
  };

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.getFiltersNew();
  }

  public hideAfter(): void {
    setTimeout(() => {
      this.modalRef.hide();
    }, 3000);
  }

  public onSubmit(event: any): void {
    const newname = event.target.name.value;
    const newcontent = event.target.content.value;
    const newexcerpt = event.target.excerpt.value;
    this.editTask = {
      id: this.task.id,
      name: newname,
      content: newcontent,
      statusName: this.getStatusName(),
      statusValue: this.filter.defaultValue,
      excerpt: newexcerpt,
      assignTo: this.usersIds[this.userDropDown.defaultValue],
      reassigned: this.task.author._id,
    };
    if (this.userDropDown.defaultValue === -1) {
      this.errorHandling();

      return;
    }
    this.tasksService.editTask(this.editTask)
      .subscribe((item: any) => this.successHandling());
  }

  private successHandling(): void {
    this.updateTask = true;
  }

  private errorHandling(): void {
    this.updateTask = false;
  }

  private readonly getStatusName = (): string => {
    const val = this.filter.defaultValue;
    const options: FilterOptions[] = this.filter.options.filter((opt: FilterOptions) => opt.value === val);

    return options[0].name;
  };

  trackElement(index: number, element: any): any {
    return element ? element.guid : 0;
  }

  getFilterStatus(): void {
    this.filter = this.filterReturnService.createFilterByName('status', 1);
  }
}
