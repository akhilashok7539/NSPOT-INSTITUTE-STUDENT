import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-browse-colleges',
  templateUrl: './browse-colleges.component.html',
  styleUrls: ['./browse-colleges.component.css']
})
export class BrowseCollegesComponent implements OnInit {
  active_index = 2;
  paginationCount = 1;
  district = "";
  searchText;
  notificationonstatus = false;
  selectedchipsvalues = [];
  currentdate;
  addmisonstarts;
  accademicLevels1;
  accademicLevels2;
  accademicLevels3;
  accademicLevels4;
  accademicLevels5;
  accademicLevels6;
  instutesname: any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }
  stateId;
  studentIDforMap;
  selectedvalueradio;
  form: FormGroup;
  instituteform: FormGroup;
  touched = false;
  studentId = localStorage.getItem("USERID");;
  username = this.authService.userProfile.username;
  studentDetails;
  accademicLevels;
  accademicLevelsCourses;
  courseStreams;
  courseStreamsSpecializations;
  courseTypes;
  universityTypes;
  courses;
  isNri = false;
  courseStreamsSpecializations3;
  courseStreamsSpecializations4;
  formvaluessession;
  // baseApiUrl = environment.baseApiUrl;
  baseApiUrl = environment.baseApiUrl;
  // classifications=['Co-Ed','Boys','Girls']
  classifications = [{
    "name": "Co-Edu",
    "status": true
  }, {
    "name": "Boys",
    "status": true
  },
  {
    "name": "Girls",
    "status": true

  }
  ]

  testlist = [
    {
      "shopSaleRate": 470,
      "mstatus": "Active",
      "_id": "61e6aaea1ef3386c576dc0a5",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e022ff533418ce8419890e",
        "menu_name": " PERI PERI AL FAHAM  FULL "
      },
      "menu_desc": "PERI PERI ALFAHAM FULL",
      "purchaseRate": 423,
      "salesRate": 470,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 423,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 440,
      "mstatus": "Active",
      "_id": "61e6bc8f1ef3386c576dde63",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9ae95595c4a74758f5c3",
        "menu_name": "AL FAHAM FULL"
      },
      "menu_desc": "AL FAHAM FULL",
      "purchaseRate": 396,
      "salesRate": 440,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 396,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 270,
      "mstatus": "Active",
      "_id": "61e6ab531ef3386c576dc0b8",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "PERI PERI ALFAHAM HALF",
      "purchaseRate": 243,
      "salesRate": 270,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 243,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
  ];
  restlist = [

    {
      "shopSaleRate": 230,
      "mstatus": "Active",
      "_id": "61ebf57e2e169a0ed1848ead",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe8652e169a0ed18481d2",
        "menu_name": "MARINARA PIZZA NON VEG"
      },
      "menu_desc": "TEASTED PIZZA",
      "purchaseRate": 207,
      "salesRate": 230,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 207,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61ebf5332e169a0ed1848e76",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe7e72e169a0ed1847e85",
        "menu_name": "MARINARA PIZZA VEG"
      },
      "menu_desc": "TASTY PIZZA",
      "purchaseRate": 198,
      "salesRate": 220,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61ebf4ed2e169a0ed1848e64",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe7382e169a0ed1847dec",
        "menu_name": "NAPOLEON PIZZA NON VEG"
      },
      "menu_desc": "WELL TASTED",
      "purchaseRate": 225,
      "salesRate": 250,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61ebf4bf2e169a0ed1848dbe",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe6d12e169a0ed1847dac",
        "menu_name": "NAPOLEON PIZZA"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 198,
      "salesRate": 220,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61ebf4882e169a0ed1848d50",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe6442e169a0ed1847b2d",
        "menu_name": "AMERICAN  PIZZA NON VEG"
      },
      "menu_desc": "TASTY",
      "purchaseRate": 225,
      "salesRate": 250,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61ebf43e2e169a0ed1848d03",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe5f92e169a0ed1847a81",
        "menu_name": "AMERICAN PIZZA VEG"
      },
      "menu_desc": "WELL TASTED ",
      "purchaseRate": 198,
      "salesRate": 220,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61ebf3fc2e169a0ed1848cc7",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe4f42e169a0ed18478e4",
        "menu_name": "MARGARITA PIZZA VEG"
      },
      "menu_desc": "TEASTY AND WELL COOKED",
      "purchaseRate": 180,
      "salesRate": 200,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 230,
      "mstatus": "Active",
      "_id": "61ebf3712e169a0ed1848c87",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebe56f2e169a0ed18479d8",
        "menu_name": "MARGARITA PIZZA NON VEG"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 207,
      "salesRate": 230,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61ebed762e169a0ed18489aa",
      "shop_id": {
        "_id": "61de7bd61fa3aad78efd7ac2",
        "shop_name": "HARDIZ FRIED CHICKEN"
      },
      "location_id": {
        "_id": "61bae036f0c292acc0387e97",
        "location": "Kollam"
      },
      "menu_id": {
        "_id": "61bf330cfbd88970c8b26d42",
        "menu_name": "ZINGER SANDWICH"
      },
      "menu_desc": "ZINGER SANDWICH INDIVIDUAL ",
      "purchaseRate": 110,
      "salesRate": 120,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 110,
      "availableTime": "11:00",
      "closingTime": "23:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61ebe1f52e169a0ed1847288",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebbe492e169a0ed1843d38",
        "menu_name": "MJ HAWANA BURGER(B)"
      },
      "menu_desc": "YUMMY AND T ASTED GOOD",
      "purchaseRate": 189,
      "salesRate": 210,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 189,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61ebe1472e169a0ed184717d",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebbc5d2e169a0ed1843c95",
        "menu_name": "MJ HAWANA BURGER(C)"
      },
      "menu_desc": "WELL COOKED TASTED DISH ",
      "purchaseRate": 144,
      "salesRate": 160,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 144,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61ebe0d02e169a0ed18470a2",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebbb1d2e169a0ed184385c",
        "menu_name": "JUICY LUCY BURGER (B)"
      },
      "menu_desc": "WELL TASTED DISH",
      "purchaseRate": 198,
      "salesRate": 220,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61ebe0422e169a0ed1846f00",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebbab32e169a0ed1843753",
        "menu_name": "JUICY LUCY BURGER(C)"
      },
      "menu_desc": "WELL TASTED DISH",
      "purchaseRate": 162,
      "salesRate": 180,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 162,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61ebdcb32e169a0ed1846d20",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb9e92e169a0ed1843593",
        "menu_name": "DOUBLE DOWN BURGER(B)"
      },
      "menu_desc": "TASTED GOOD AND WELL COOKED",
      "purchaseRate": 189,
      "salesRate": 210,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 189,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 170,
      "mstatus": "Active",
      "_id": "61ebdc2f2e169a0ed1846d0d",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb9852e169a0ed1843574",
        "menu_name": "DOUBLE DOWN BURGER(C)"
      },
      "menu_desc": "YUMMY LOOK TASTED GOOD ",
      "purchaseRate": 153,
      "salesRate": 170,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 153,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61ebdbcf2e169a0ed1846cfc",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb9202e169a0ed184354e",
        "menu_name": "ZINGA BURGER FISH"
      },
      "menu_desc": "WELL TASTED DISH ",
      "purchaseRate": 144,
      "salesRate": 160,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 144,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ebdb722e169a0ed1846cea",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb8b12e169a0ed1843524",
        "menu_name": "ZINGA BURGER CHICKEN"
      },
      "menu_desc": "WELL TASTED FOOD",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ebdb222e169a0ed1846cd8",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb8352e169a0ed18432ea",
        "menu_name": "CLASSIC BURGER BEEF"
      },
      "menu_desc": "WELL TASTED DISH",
      "purchaseRate": 135,
      "salesRate": 150,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61ebdab22e169a0ed1846cc6",
      "shop_id": {
        "_id": "61eaeddc2e169a0ed183de47",
        "shop_name": "MAHE JUNCTION"
      },
      "location_id": {
        "_id": "61badf9cf0c292acc0387e94",
        "location": "Oachira"
      },
      "menu_id": {
        "_id": "61ebb7f42e169a0ed184312b",
        "menu_name": "CLASSIC BURGER CHICKEN"
      },
      "menu_desc": "tasty clssic burger",
      "purchaseRate": 99,
      "salesRate": 110,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 420,
      "mstatus": "Active",
      "_id": "61ebafdf2e169a0ed1842513",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d1991a874e7805ac3473ef",
        "menu_name": "KANTHARI AL FAHAM FULL"
      },
      "menu_desc": "SPICY AND WELL TASTED DISH",
      "purchaseRate": 378,
      "salesRate": 483,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 378,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61ebaf932e169a0ed18424ae",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d19a38874e7805ac347468",
        "menu_name": "KANTHARI AL FAHAM HALF"
      },
      "menu_desc": "SPICY AND WELL TASTED DISH",
      "purchaseRate": 216,
      "salesRate": 276,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61ebaf412e169a0ed1842450",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d19ac0874e7805ac347553",
        "menu_name": "KANTHARI AL FAHAM  QTR"
      },
      "menu_desc": "SPICYAND WELL TASTED DISH",
      "purchaseRate": 117,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 400,
      "mstatus": "Active",
      "_id": "61ebaef02e169a0ed18423c0",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d421f54d69ea0276c75f48",
        "menu_name": "PEPPER AL FAHAM FULL"
      },
      "menu_desc": "TASTY AND WELL TASTED DISH",
      "purchaseRate": 360,
      "salesRate": 460,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 360,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61ebae7a2e169a0ed1842308",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d4222c4d69ea0276c75f68",
        "menu_name": "PEPPER AL FAHAM HALF"
      },
      "menu_desc": "SPICY AND WELL TASTED DISH",
      "purchaseRate": 198,
      "salesRate": 253,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61ebae172e169a0ed1842297",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf8bc0fbd88970c8b26d9c",
        "menu_name": "PEPPER AL FAHAM "
      },
      "menu_desc": "APICY AND WELL TASTED DISH",
      "purchaseRate": 108,
      "salesRate": 138,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61ebaa172e169a0ed1841bba",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e019a3533418ce84185b90",
        "menu_name": "SHAWAI HALF"
      },
      "menu_desc": "TASTY ARABIAN DISH",
      "purchaseRate": 180,
      "salesRate": 230,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "16:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 700,
      "mstatus": "Active",
      "_id": "61eba8c62e169a0ed1841a4f",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eba7a02e169a0ed1841a0d",
        "menu_name": "AL FAHM MANTHI(FULL)"
      },
      "menu_desc": "WELL TASTED ARABIAN DISH",
      "purchaseRate": 630,
      "salesRate": 805,
      "packingCharge": 10,
      "discount": "0",
      "discamountAmount": 630,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61eba86f2e169a0ed1841a37",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eba71d2e169a0ed1841a04",
        "menu_name": "AL FAHM MANDI(HALF)"
      },
      "menu_desc": "WELL TASTED ARABIAN DISH",
      "purchaseRate": 324,
      "salesRate": 414,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 324,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61eba8192e169a0ed1841a24",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eba6692e169a0ed1841753",
        "menu_name": "AL FAHM MANTHI(QTR)"
      },
      "menu_desc": "WELL TASTED DISH",
      "purchaseRate": 162,
      "salesRate": 207,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 162,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61eba5b92e169a0ed1841591",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eba5782e169a0ed18414c5",
        "menu_name": "MANTHI RICE"
      },
      "menu_desc": "RICE",
      "purchaseRate": 72,
      "salesRate": 92,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 72,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61eba3632e169a0ed184116e",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bcab9f5595c4a74758f5d9",
        "menu_name": "BIRIYANI RICE"
      },
      "menu_desc": "TASTY DISH ",
      "purchaseRate": 72,
      "salesRate": 92,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 72,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61eba0c32e169a0ed1840e26",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eba0662e169a0ed1840df4",
        "menu_name": "BEEF KIZHI BIRIYANI"
      },
      "menu_desc": "WELL TEASTY DISH",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61eb9f942e169a0ed1840bad",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61eb9f1b2e169a0ed1840ae5",
        "menu_name": "CHICKEN KIZHI BIRIYANI"
      },
      "menu_desc": "WELL TEASTED DISH",
      "purchaseRate": 144,
      "salesRate": 184,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 144,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61eb9cec2e169a0ed18407be",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d584144d69ea0276c98e86",
        "menu_name": "MUTTON BIRIYANI"
      },
      "menu_desc": "TASTY AND GOOD WELL DISH",
      "purchaseRate": 225,
      "salesRate": 288,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61eb9add2e169a0ed183fd2e",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e50045ba4a0042daaf8000",
        "menu_name": "VEG BIRIYAANI"
      },
      "menu_desc": "TASTY DISH ",
      "purchaseRate": 72,
      "salesRate": 92,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 72,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61eb98102e169a0ed183fad6",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bcdf83420218103a5292f3",
        "menu_name": "EGG NOODLES "
      },
      "menu_desc": "TASTY SPICIAL DISH",
      "purchaseRate": 90,
      "salesRate": 115,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 90,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61eb953a2e169a0ed183f7d4",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf120cfbd88970c8b26cd7",
        "menu_name": "MUTTON CURRY"
      },
      "menu_desc": "teasty dish",
      "purchaseRate": 180,
      "salesRate": 230,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61eb927a2e169a0ed183f658",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf8ee2fbd88970c8b26da2",
        "menu_name": "BEEF KONDATTAM"
      },
      "menu_desc": "spicy and hot dish",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61eb922b2e169a0ed183f5da",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bef24ffbd88970c8b26c95",
        "menu_name": "BEEF KANTHARI"
      },
      "menu_desc": "spicy dish ",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61eb91d22e169a0ed183f58b",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bce284420218103a5292f9",
        "menu_name": "PEPPER BEEF(DRY)"
      },
      "menu_desc": "spicy and teasty",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9da82e169a0ed1836dc4",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf3240fbd88970c8b26d41",
        "menu_name": "KERALA CHILLY CHICKEN FRY"
      },
      "menu_desc": "HOT AND SPICY DISH,WELL TEASTED",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ea9d2c2e169a0ed1836d82",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bd72df420218103a529305",
        "menu_name": "CHICKEN MANCHURIYAN"
      },
      "menu_desc": "WELL TEASTED DISH ",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9cd92e169a0ed1836d6f",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf53f5fbd88970c8b26d5b",
        "menu_name": "CHICKEN SZECHUAN"
      },
      "menu_desc": "WELL TEASTED DISH",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61ea9c872e169a0ed1836d58",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bda0bf5884267ab4202690",
        "menu_name": "DRAGON CHICKEN"
      },
      "menu_desc": "SPICY AND WELL TEASTED DISH",
      "purchaseRate": 180,
      "salesRate": 230,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9c162e169a0ed1836d19",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61ea9bb72e169a0ed1836c65",
        "menu_name": "CHICKEN PIRATTU"
      },
      "menu_desc": "SPICY AND WELL TEASTED DISH",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9b3d2e169a0ed1836c19",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bedc71fbd88970c8b26c8c",
        "menu_name": "CHICKEN VARATHARACHATHU"
      },
      "menu_desc": "TEASTY AND SPICY",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9afe2e169a0ed1836c01",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf2b15fbd88970c8b26d22",
        "menu_name": "CHICKEN MUGHALAI "
      },
      "menu_desc": "TEASTY GOOD AND SPICY",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61ea9a732e169a0ed1836ba1",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bef060fbd88970c8b26c92",
        "menu_name": "CHICKEN MALABARI"
      },
      "menu_desc": "TEASTY GOOD",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ea96ba2e169a0ed18368d7",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e94a841ef3386c5770027d",
        "menu_name": "CHICKEN GARLIC"
      },
      "menu_desc": "TEASTY AND SPICY",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ea8e7c2e169a0ed183627a",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf65fafbd88970c8b26d61",
        "menu_name": "MUSHROOM MANJOORIAN "
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ea8d0d2e169a0ed1836125",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bdf52413eab893a8c7017b",
        "menu_name": "CHILLY MUSHROOM DRY"
      },
      "menu_desc": "SPICYAND HOT",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61ea8cab2e169a0ed18360e1",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e43245ba4a0042daaf2507",
        "menu_name": "MUSHROOM MASALA"
      },
      "menu_desc": "SPICY AND WELL TEASTED FOOD",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61ea87792e169a0ed1835aa7",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bd7f585884267ab4202626",
        "menu_name": "CHILLY GOBI"
      },
      "menu_desc": "SPICY AND TEASTY",
      "purchaseRate": 81,
      "salesRate": 104,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 25,
      "mstatus": "Active",
      "_id": "61ea545d1ef3386c577111e4",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61ea53c11ef3386c57710ed7",
        "menu_name": "NAAN"
      },
      "menu_desc": "TEASTY FOOD",
      "purchaseRate": 22.5,
      "salesRate": 29,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 22.5,
      "availableTime": "15:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 15,
      "mstatus": "Active",
      "_id": "61ea53191ef3386c57710e6a",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e508c4ba4a0042daaf8f9f",
        "menu_name": "TANDOORI ROTTI"
      },
      "menu_desc": "TEASTY FOOD",
      "purchaseRate": 13.5,
      "salesRate": 17,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 13.5,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 125,
      "mstatus": "Active",
      "_id": "61ea26e41ef3386c5770def0",
      "shop_id": {
        "_id": "61c0d8d0e7e71d910cc47927",
        "shop_name": "ADITYA HOTEL "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bd72df420218103a529305",
        "menu_name": "CHICKEN MANCHURIYAN"
      },
      "menu_desc": "tasty",
      "purchaseRate": 111.25,
      "salesRate": 144,
      "packingCharge": 0,
      "discount": "1",
      "discamountAmount": 111.25,
      "availableTime": "09:00",
      "closingTime": "09:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e9a3db1ef3386c5770c995",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61dfe3eabe8cc24f93803854",
        "menu_name": "FISH CURRY"
      },
      "menu_desc": "0",
      "purchaseRate": 63,
      "salesRate": 80,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 63,
      "availableTime": "11:00",
      "closingTime": "13:59",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e9a3b71ef3386c5770c984",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf82f6fbd88970c8b26d91",
        "menu_name": "AYALA FRY"
      },
      "menu_desc": "0",
      "purchaseRate": 54,
      "salesRate": 70,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "11:00",
      "closingTime": "14:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 50,
      "mstatus": "Active",
      "_id": "61e9a3a11ef3386c5770c973",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf8282fbd88970c8b26d90",
        "menu_name": "MATHI FRY"
      },
      "menu_desc": "0",
      "purchaseRate": 45,
      "salesRate": 60,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 45,
      "availableTime": "11:00",
      "closingTime": "14:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e9a3771ef3386c5770c961",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc95885595c4a74758f5be",
        "menu_name": "IDIYAPPAM"
      },
      "menu_desc": "0",
      "purchaseRate": 9,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 9,
      "availableTime": "09:00",
      "closingTime": "11:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e9a33b1ef3386c5770c950",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcab435595c4a74758f5d8",
        "menu_name": "CHICKEN BIRIYANI"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 145,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:30",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e9a24c1ef3386c5770c91c",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e3bb49aba46abeb2231d6e",
        "menu_name": "CHICKEN MANJOORIAN"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 150,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 0,
      "mstatus": "Active",
      "_id": "61e9a21f1ef3386c5770c90a",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bce2ea420218103a5292fa",
        "menu_name": "CHILLY CHICKEN "
      },
      "menu_desc": "0",
      "purchaseRate": 0,
      "salesRate": 130,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 0,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 85,
      "mstatus": "Active",
      "_id": "61e9a1a31ef3386c5770c8f8",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf822efbd88970c8b26d8f",
        "menu_name": "MEALS"
      },
      "menu_desc": "0",
      "purchaseRate": 76.5,
      "salesRate": 90,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 76.5,
      "availableTime": "11:30",
      "closingTime": "14:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e9a1521ef3386c5770c8e7",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e51207ba4a0042daafa2a7",
        "menu_name": "VEG NOODDLES"
      },
      "menu_desc": "0",
      "purchaseRate": 81,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 30,
      "mstatus": "Active",
      "_id": "61e9a1361ef3386c5770c8d5",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bce1c4420218103a5292f7",
        "menu_name": "VEG KURUMA"
      },
      "menu_desc": "0",
      "purchaseRate": 27,
      "salesRate": 35,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 27,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e9a0f41ef3386c5770c8c4",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61be1c4ceeca7bd7222da4d6",
        "menu_name": "VEG FRIED RICE"
      },
      "menu_desc": "0",
      "purchaseRate": 81,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61e9a0c21ef3386c5770c8b2",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf1cfdfbd88970c8b26d02",
        "menu_name": "VEG BIRIYANI"
      },
      "menu_desc": "0",
      "purchaseRate": 72,
      "salesRate": 85,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 72,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 20,
      "mstatus": "Active",
      "_id": "61e9a0071ef3386c5770c885",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb876f5595c4a74758f416",
        "menu_name": "TANDOORI POROTTA"
      },
      "menu_desc": "0",
      "purchaseRate": 18,
      "salesRate": 20,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 18,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e99feb1ef3386c5770c874",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc91c35595c4a74758f5a9",
        "menu_name": "TANDOORI CHICKEN QUARTER"
      },
      "menu_desc": "0",
      "purchaseRate": 99,
      "salesRate": 119,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61e99fc91ef3386c5770c862",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bca1fe5595c4a74758f5cf",
        "menu_name": "TANDOORI CHICKEN HALF"
      },
      "menu_desc": "0",
      "purchaseRate": 198,
      "salesRate": 220,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "04:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 400,
      "mstatus": "Active",
      "_id": "61e99fab1ef3386c5770c851",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bca0bc5595c4a74758f5ce",
        "menu_name": "TANDOORI CHICKEN FULL"
      },
      "menu_desc": "0",
      "purchaseRate": 360,
      "salesRate": 399,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 360,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 12,
      "mstatus": "Active",
      "_id": "61e99f701ef3386c5770c840",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61b9b5f7f0c292acc0387e29",
        "menu_name": "PORATTA"
      },
      "menu_desc": "0",
      "purchaseRate": 10.8,
      "salesRate": 12,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10.8,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 190,
      "mstatus": "Active",
      "_id": "61e99f521ef3386c5770c82e",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e953f01ef3386c5770301c",
        "menu_name": "PORICHA KOZHI(HALF)"
      },
      "menu_desc": "0",
      "purchaseRate": 171,
      "salesRate": 199,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 171,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61e99f211ef3386c5770c81d",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e955131ef3386c577030e3",
        "menu_name": "PORICHA KOZHI (FULL)"
      },
      "menu_desc": "0",
      "purchaseRate": 324,
      "salesRate": 360,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 324,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e99eff1ef3386c5770c80c",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd9e255884267ab4202680",
        "menu_name": "PEPPER CHICKEN  "
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 147,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e99ece1ef3386c5770c7fa",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d15f9b6164c5ba12414941",
        "menu_name": "BEEF PEPPER FRY"
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 159,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61e99e801ef3386c5770c77d",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf6da7fbd88970c8b26d6d",
        "menu_name": "PANEER TIKKA "
      },
      "menu_desc": "0",
      "purchaseRate": 162,
      "salesRate": 190,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 162,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e99e531ef3386c5770c6b7",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bdb2005884267ab42026b8",
        "menu_name": "PANEER BUTTER MASALA"
      },
      "menu_desc": "0",
      "purchaseRate": 117,
      "salesRate": 136,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 40,
      "mstatus": "Active",
      "_id": "61e99e181ef3386c5770c6a6",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb8f965595c4a74758f425",
        "menu_name": "OMLET"
      },
      "menu_desc": "0",
      "purchaseRate": 36,
      "salesRate": 45,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 36,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 25,
      "mstatus": "Active",
      "_id": "61e99dfe1ef3386c5770c695",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61ba324df0c292acc0387e56",
        "menu_name": "PLAIN NAAN"
      },
      "menu_desc": "0",
      "purchaseRate": 22.5,
      "salesRate": 25,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 22.5,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e99dd91ef3386c5770c683",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcdf17420218103a5292f1",
        "menu_name": "MIXED NOODLES"
      },
      "menu_desc": "0",
      "purchaseRate": 117,
      "salesRate": 138,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e99dad1ef3386c5770c672",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcd388420218103a5292e2",
        "menu_name": "MIXED FRIED RICE"
      },
      "menu_desc": "0",
      "purchaseRate": 117,
      "salesRate": 138,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61e99d811ef3386c5770c661",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf6e58fbd88970c8b26d6e",
        "menu_name": "MALAI KEBAB"
      },
      "menu_desc": "0",
      "purchaseRate": 180,
      "salesRate": 210,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61e99d2d1ef3386c5770c64f",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcd278420218103a5292dc",
        "menu_name": "MANDI RICE"
      },
      "menu_desc": "0",
      "purchaseRate": 72,
      "salesRate": 80,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 72,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e99cbd1ef3386c5770c63d",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61ba3098f0c292acc0387e54",
        "menu_name": "KUBOOS"
      },
      "menu_desc": "0",
      "purchaseRate": 9,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 9,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e99c9a1ef3386c5770c62c",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61dfe56fbe8cc24f938039c8",
        "menu_name": "PANEER KADAI "
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 159,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e99c6e1ef3386c5770c61a",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd9dab5884267ab420267f",
        "menu_name": "KADAI CHICKEN"
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 159,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61e99c401ef3386c5770c609",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e025e3533418ce84199327",
        "menu_name": "HARIYALI KEBAB"
      },
      "menu_desc": "0",
      "purchaseRate": 225,
      "salesRate": 250,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e99c121ef3386c5770c5f7",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bdf25f13eab893a8c70177",
        "menu_name": "GOBI MANCHURIAN DRY"
      },
      "menu_desc": "0",
      "purchaseRate": 81,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e99be61ef3386c5770c5e6",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61dfe822be8cc24f93807377",
        "menu_name": "GOBI 65"
      },
      "menu_desc": "0",
      "purchaseRate": 99,
      "salesRate": 120,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e99bb31ef3386c5770c5d5",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d588314d69ea0276c998fa",
        "menu_name": "GINGER CHICKEN QTR"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 147,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e99b7f1ef3386c5770c5c3",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb865c5595c4a74758f414",
        "menu_name": "GARLIC NAAN"
      },
      "menu_desc": "0",
      "purchaseRate": 54,
      "salesRate": 60,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e99b5a1ef3386c5770c5b2",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d6a3da194ba6a59b1beef8",
        "menu_name": "GARLIC CHICKEN "
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 147,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e99b121ef3386c5770c5a0",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb8ce55595c4a74758f422",
        "menu_name": "EGG ROAST"
      },
      "menu_desc": "0",
      "purchaseRate": 54,
      "salesRate": 70,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e99af71ef3386c5770c58f",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb8d1c5595c4a74758f423",
        "menu_name": "EGG MASALA"
      },
      "menu_desc": "0",
      "purchaseRate": 63,
      "salesRate": 75,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 63,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 30,
      "mstatus": "Active",
      "_id": "61e99acf1ef3386c5770c57e",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb8c045595c4a74758f421",
        "menu_name": "EGG CURRY"
      },
      "menu_desc": "0",
      "purchaseRate": 27,
      "salesRate": 35,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 27,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e99aab1ef3386c5770c56c",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb8e685595c4a74758f424",
        "menu_name": "EGG CHILLY"
      },
      "menu_desc": "0",
      "purchaseRate": 54,
      "salesRate": 63,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e99a6b1ef3386c5770c55b",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf1d7efbd88970c8b26d03",
        "menu_name": "EGG BIRIYANI "
      },
      "menu_desc": "0",
      "purchaseRate": 81,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61e99a271ef3386c5770c549",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb905f5595c4a74758f426",
        "menu_name": "DUCK KURUMA"
      },
      "menu_desc": "0",
      "purchaseRate": 180,
      "salesRate": 210,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e999df1ef3386c5770c538",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd96235884267ab4202657",
        "menu_name": "CHILLY PANEER"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e999b71ef3386c5770c526",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd7f585884267ab4202626",
        "menu_name": "CHILLY GOBI"
      },
      "menu_desc": "0",
      "purchaseRate": 81,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 0,
      "mstatus": "Active",
      "_id": "61e999631ef3386c5770c515",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf5257fbd88970c8b26d55",
        "menu_name": "CHILLY CHICKEN (QUARTER)"
      },
      "menu_desc": "0",
      "purchaseRate": 0,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 0,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e999451ef3386c5770c503",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf528ffbd88970c8b26d56",
        "menu_name": "CHILLY CHICKEN (HALF)"
      },
      "menu_desc": "0",
      "purchaseRate": 216,
      "salesRate": 250,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 400,
      "mstatus": "Active",
      "_id": "61e999191ef3386c5770c4f2",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf52bcfbd88970c8b26d57",
        "menu_name": "CHILLY CHICKEN (FULL)"
      },
      "menu_desc": "0",
      "purchaseRate": 360,
      "salesRate": 400,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 360,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e998f61ef3386c5770c4e1",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd7dab78500a72fd98d912",
        "menu_name": "CHILLY BEEF"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "17:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61e998d01ef3386c5770c4d0",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf6d4afbd88970c8b26d6c",
        "menu_name": "CHICKEN TIKKA"
      },
      "menu_desc": "0",
      "purchaseRate": 180,
      "salesRate": 200,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e998a51ef3386c5770c4be",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd9a755884267ab420266b",
        "menu_name": "CHICKEN ROAST"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e9986b1ef3386c5770c4ad",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcdcb4420218103a5292ee",
        "menu_name": "CHICKEN NOODLES "
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e9983e1ef3386c5770c49b",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf3114fbd88970c8b26d3d",
        "menu_name": "CHICKEN MASALA"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e998021ef3386c5770c480",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcdb14420218103a5292ed",
        "menu_name": "KUZHI MANDHI  QUATER ( CHICKEN)"
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 160,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 300,
      "mstatus": "Active",
      "_id": "61e997b61ef3386c5770c45c",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcda89420218103a5292ec",
        "menu_name": "KUZHI MANDHI HALF( CHICKEN)"
      },
      "menu_desc": "0",
      "purchaseRate": 270,
      "salesRate": 319,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 270,
      "availableTime": "10:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 600,
      "mstatus": "Active",
      "_id": "61e9978c1ef3386c5770c44b",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bcd886420218103a5292ea",
        "menu_name": "KUZHI MANDHI FULL (CHICKEN)"
      },
      "menu_desc": "0",
      "purchaseRate": 540,
      "salesRate": 599,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 0,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e997401ef3386c5770c439",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf3029fbd88970c8b26d3a",
        "menu_name": "CHICKEN KURUMA"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 149,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e997181ef3386c5770c428",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf2ccafbd88970c8b26d29",
        "menu_name": "CHICKEN KONDATTAM"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 149,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 0,
      "mstatus": "Active",
      "_id": "61e996d11ef3386c5770c416",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d6a1e16a4cc86b88ec3b8e",
        "menu_name": "CHICKEN KANTHARI "
      },
      "menu_desc": "0",
      "purchaseRate": 0,
      "salesRate": 139,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 0,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e9969f1ef3386c5770c3f8",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf2f93fbd88970c8b26d37",
        "menu_name": "CHICKEN FRY"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e996331ef3386c5770c3e5",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bec4c0344b0d4100749d2c",
        "menu_name": "CHICKEN FRIED RICE"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 126,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e994b81ef3386c5770c246",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf31bffbd88970c8b26d3f",
        "menu_name": "CHICKEN CURRY"
      },
      "menu_desc": "0",
      "purchaseRate": 90,
      "salesRate": 110,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 90,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 0,
      "mstatus": "Active",
      "_id": "61e994831ef3386c5770c234",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf2aacfbd88970c8b26d20",
        "menu_name": "CHICKEN CHETTINADU"
      },
      "menu_desc": "0",
      "purchaseRate": 0,
      "salesRate": 150,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 0,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e994621ef3386c5770c223",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bd9bf95884267ab4202675",
        "menu_name": "CHICKEN 65"
      },
      "menu_desc": "0",
      "purchaseRate": 99,
      "salesRate": 150,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "17:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e994241ef3386c5770c212",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf2dadfbd88970c8b26d2e",
        "menu_name": "CHICKEN 65 (HALF)"
      },
      "menu_desc": "0",
      "purchaseRate": 216,
      "salesRate": 240,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 480,
      "mstatus": "Active",
      "_id": "61e993f31ef3386c5770c200",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf2deafbd88970c8b26d2f",
        "menu_name": "CHICKEN 65 (FULL)"
      },
      "menu_desc": "0",
      "purchaseRate": 432,
      "salesRate": 480,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 432,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e993cb1ef3386c5770c1ef",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61ba2fe1f0c292acc0387e53",
        "menu_name": "CHAPPATHI"
      },
      "menu_desc": "0",
      "purchaseRate": 9,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 9,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e993a41ef3386c5770c1dd",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf5065fbd88970c8b26d52",
        "menu_name": "BUTTER CHICKEN (QUARTER)"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 149,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 260,
      "mstatus": "Active",
      "_id": "61e9937c1ef3386c5770c1cc",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf509afbd88970c8b26d53",
        "menu_name": "BUTTER CHICKEN (HALF) "
      },
      "menu_desc": "0",
      "purchaseRate": 234,
      "salesRate": 260,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 234,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 500,
      "mstatus": "Active",
      "_id": "61e993521ef3386c5770c1bb",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf50c9fbd88970c8b26d54",
        "menu_name": "BUTTER CHICKEN (FULL)"
      },
      "menu_desc": "0",
      "purchaseRate": 450,
      "salesRate": 499,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 450,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 30,
      "mstatus": "Active",
      "_id": "61e992d31ef3386c5770c1a9",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb85d75595c4a74758f413",
        "menu_name": "BUTTER NAAN"
      },
      "menu_desc": "0",
      "purchaseRate": 27,
      "salesRate": 30,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 27,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 20,
      "mstatus": "Active",
      "_id": "61e992811ef3386c5770c197",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb86f15595c4a74758f415",
        "menu_name": "KULCHA"
      },
      "menu_desc": "0",
      "purchaseRate": 18,
      "salesRate": 20,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 18,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e9925a1ef3386c5770c186",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bdab165884267ab42026a6",
        "menu_name": "BEEF ULATHIYATHU"
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 150,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e9923c1ef3386c5770c174",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bdaba55884267ab42026a7",
        "menu_name": "BEEF ROAST"
      },
      "menu_desc": "0",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e991e41ef3386c5770c163",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf8ee2fbd88970c8b26da2",
        "menu_name": "BEEF KONDATTAM"
      },
      "menu_desc": "0",
      "purchaseRate": 135,
      "salesRate": 159,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61e991b61ef3386c5770c151",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf0e80fbd88970c8b26cc1",
        "menu_name": "BEEF KIZHI"
      },
      "menu_desc": "0",
      "purchaseRate": 144,
      "salesRate": 169,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 144,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e991701ef3386c5770c140",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf29f9fbd88970c8b26d1d",
        "menu_name": "BEEF FRY"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 130,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "12:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e991431ef3386c5770c12e",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf7440fbd88970c8b26d78",
        "menu_name": "BEEF CURRY"
      },
      "menu_desc": "0",
      "purchaseRate": 90,
      "salesRate": 99,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 90,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 260,
      "mstatus": "Active",
      "_id": "61e990e41ef3386c5770c11d",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf716afbd88970c8b26d74",
        "menu_name": "BANJARA KEBAB"
      },
      "menu_desc": "0",
      "purchaseRate": 234,
      "salesRate": 260,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 234,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61e990ac1ef3386c5770c10b",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e019a3533418ce84185b90",
        "menu_name": "SHAWAI HALF"
      },
      "menu_desc": "0",
      "purchaseRate": 180,
      "salesRate": 200,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 380,
      "mstatus": "Active",
      "_id": "61e990741ef3386c5770c0fa",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc9e175595c4a74758f5ca",
        "menu_name": "SHAWAI FULL"
      },
      "menu_desc": "0",
      "purchaseRate": 342,
      "salesRate": 380,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 342,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e9903c1ef3386c5770c0c0",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bb3e31f0c292acc0387eba",
        "menu_name": "APPAM"
      },
      "menu_desc": "0",
      "purchaseRate": 9,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 9,
      "availableTime": "09:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e98f901ef3386c5770c08b",
      "shop_id": {
        "_id": "61c0d8d0e7e71d910cc47927",
        "shop_name": "ADITYA HOTEL "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bcdf17420218103a5292f1",
        "menu_name": "MIXED NOODLES"
      },
      "menu_desc": "tasty",
      "purchaseRate": 120.15,
      "salesRate": 155,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 133.5,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61e98f7b1ef3386c5770bf39",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc79865595c4a74758f591",
        "menu_name": "ALFAHAM MANDI QTR"
      },
      "menu_desc": "0",
      "purchaseRate": 162,
      "salesRate": 180,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 162,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61e98f381ef3386c5770be54",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc7b5c5595c4a74758f594",
        "menu_name": "ALFAHAM MANDI HALF"
      },
      "menu_desc": "0",
      "purchaseRate": 324,
      "salesRate": 360,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 324,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 700,
      "mstatus": "Active",
      "_id": "61e98ee31ef3386c5770bd87",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc7a4d5595c4a74758f592",
        "menu_name": "ALFAHAM MANDI FULL"
      },
      "menu_desc": "0",
      "purchaseRate": 630,
      "salesRate": 699,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 630,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e98ed21ef3386c5770bd75",
      "shop_id": {
        "_id": "61c0d8d0e7e71d910cc47927",
        "shop_name": "ADITYA HOTEL "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bdb2005884267ab42026b8",
        "menu_name": "PANEER BUTTER MASALA"
      },
      "menu_desc": "Tasty",
      "purchaseRate": 124.6,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 124.6,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e98e201ef3386c5770bd18",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d19ac0874e7805ac347553",
        "menu_name": "KANTHARI AL FAHAM  QTR"
      },
      "menu_desc": "0",
      "purchaseRate": 117,
      "salesRate": 129,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e98df61ef3386c5770bd06",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d19a38874e7805ac347468",
        "menu_name": "KANTHARI AL FAHAM HALF"
      },
      "menu_desc": "0",
      "purchaseRate": 216,
      "salesRate": 239,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 420,
      "mstatus": "Active",
      "_id": "61e98dbf1ef3386c5770bcf5",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61d1991a874e7805ac3473ef",
        "menu_name": "KANTHARI AL FAHAM FULL"
      },
      "menu_desc": "0",
      "purchaseRate": 378,
      "salesRate": 419,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 378,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e98d731ef3386c5770bce3",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc9d865595c4a74758f5c7",
        "menu_name": "AL FAHAM QUARTER"
      },
      "menu_desc": "0",
      "purchaseRate": 108,
      "salesRate": 119,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 200,
      "mstatus": "Active",
      "_id": "61e98d241ef3386c5770bc5e",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc9bec5595c4a74758f5c5",
        "menu_name": "AL FAHAM HALF"
      },
      "menu_desc": "TASTY",
      "purchaseRate": 180,
      "salesRate": 210,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 180,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 400,
      "mstatus": "Active",
      "_id": "61e98cd81ef3386c5770bc34",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61e91b701ef3386c576fba6a",
        "menu_name": "AL FAHM FULL"
      },
      "menu_desc": "TASTY",
      "purchaseRate": 360,
      "salesRate": 399,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 360,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61e98bd41ef3386c5770baef",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bc92a85595c4a74758f5aa",
        "menu_name": "BBQ HALF"
      },
      "menu_desc": "TASTY",
      "purchaseRate": 198,
      "salesRate": 219,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 198,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 399,
      "mstatus": "Active",
      "_id": "61e98b911ef3386c5770ba4e",
      "shop_id": {
        "_id": "61e988e71ef3386c5770b6e1",
        "shop_name": "MURALI HOTEL,HARIPAD"
      },
      "location_id": {
        "_id": "61baded1f0c292acc0387e8d",
        "location": "Karuvatta "
      },
      "menu_id": {
        "_id": "61bf818afbd88970c8b26d8e",
        "menu_name": "BBQ FULL"
      },
      "menu_desc": "TASTY",
      "purchaseRate": 359.1,
      "salesRate": 399,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 359.1,
      "availableTime": "16:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61e9555d1ef3386c5770319c",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e955131ef3386c577030e3",
        "menu_name": "PORICHA KOZHI (FULL)"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 324,
      "salesRate": 414,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 324,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 190,
      "mstatus": "Active",
      "_id": "61e9544a1ef3386c57703054",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e953f01ef3386c5770301c",
        "menu_name": "PORICHA KOZHI(HALF)"
      },
      "menu_desc": "SPICY AND HOT",
      "purchaseRate": 171,
      "salesRate": 219,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 171,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e952c51ef3386c57702e20",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf2dadfbd88970c8b26d2e",
        "menu_name": "CHICKEN 65 (HALF)"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 216,
      "salesRate": 276,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "11:00",
      "closingTime": "22:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e9518e1ef3386c57702a23",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e951391ef3386c57701f26",
        "menu_name": "CHICKEN FRY (DRY)"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 108,
      "salesRate": 155,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e94ad91ef3386c577002ab",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e94a841ef3386c5770027d",
        "menu_name": "CHICKEN GARLIC"
      },
      "menu_desc": "TEASTY AND SPICY",
      "purchaseRate": 128.8,
      "salesRate": 140,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 128.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e9498c1ef3386c57700205",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61dfe249be8cc24f9380368d",
        "menu_name": "CHICKEN PEPPER MASALA"
      },
      "menu_desc": "SPICY AND HOT",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e9490f1ef3386c57700154",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e9489b1ef3386c57700126",
        "menu_name": "CHICKEN GINGER"
      },
      "menu_desc": "SPICY AND HOT",
      "purchaseRate": 126,
      "salesRate": 181,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e947491ef3386c576fff3b",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e946e41ef3386c576fff0c",
        "menu_name": "CHICKEN KADAI"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e935dc1ef3386c576fd829",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e3c6f9aba46abeb223793b",
        "menu_name": "CHILLI GOBI"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 81,
      "salesRate": 117,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e934891ef3386c576fd7ae",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e011f5533418ce8417d195",
        "menu_name": "PANEER MANCHURIAN"
      },
      "menu_desc": "YUMMY AND ",
      "purchaseRate": 126,
      "salesRate": 161,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 126,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e933b01ef3386c576fd6dc",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61dfe56fbe8cc24f938039c8",
        "menu_name": "PANEER KADAI "
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e91a411ef3386c576fb980",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e919cd1ef3386c576fb87c",
        "menu_name": "FULL MEAT PLATE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e918c01ef3386c576fb844",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e9183e1ef3386c576fb816",
        "menu_name": "FULL MEAT ROLL"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 81,
      "salesRate": 90,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e915fb1ef3386c576fb758",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e01bdf533418ce841912e7",
        "menu_name": "PLATE SHAWARMA "
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 90,
      "salesRate": 100,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 90,
      "availableTime": "03:00",
      "closingTime": "19:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e9158d1ef3386c576fb745",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf182ffbd88970c8b26cf5",
        "menu_name": "SHAWARMA ROLL"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 54,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e90f621ef3386c576fb2c4",
      "shop_id": {
        "_id": "61c4affc5fbdb1ea4b36589a",
        "shop_name": "BAKE HOUSE."
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61cc73bfec0261ad83e3a9b6",
        "menu_name": "VEG BURGER"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 62.4,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 62.4,
      "availableTime": "09:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61e909531ef3386c576fad65",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 202.4,
      "salesRate": 260,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 202.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61e9062a1ef3386c576fac26",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e019a3533418ce84185b90",
        "menu_name": "SHAWAI HALF"
      },
      "menu_desc": "SPICY AND TEASTY",
      "purchaseRate": 193.2,
      "salesRate": 245,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 193.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e905c11ef3386c576fab72",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e01a0a533418ce841880fd",
        "menu_name": "SHAWAI QTR"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e903311ef3386c576faa37",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e9027f1ef3386c576fa992",
        "menu_name": "ROYAL FRUIT SALAD"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 110.4,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 110.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e8237b1ef3386c576f6bb6",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf51cbc2bfd3968b90262e",
        "menu_name": "CHOCO VELVET"
      },
      "menu_desc": "CHOCO VELVET ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e823561ef3386c576f6ba5",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf5600c2bfd3968b903c09",
        "menu_name": "MILK TRUFFLE- 1 KG"
      },
      "menu_desc": "MILK TRUFFLE ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e822b31ef3386c576f6ab0",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf53a5c2bfd3968b902db3",
        "menu_name": "OREO CAKE"
      },
      "menu_desc": "OREO CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 950,
      "mstatus": "Active",
      "_id": "61e8226d1ef3386c576f6a9a",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf52abc2bfd3968b902afa",
        "menu_name": "RED BEE"
      },
      "menu_desc": "RED BEE CAKE 1KG",
      "purchaseRate": 855,
      "salesRate": 1050,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 855,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e820e31ef3386c576f6a39",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61d067c3007077db35694a57",
        "menu_name": "IRISH COFFEE CAKE "
      },
      "menu_desc": "IRISH CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 600,
      "mstatus": "Active",
      "_id": "61e820791ef3386c576f6a27",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cdc6c9cac184712e756ffa",
        "menu_name": "WHITE FOREST "
      },
      "menu_desc": "WHITE FOREST 1KG",
      "purchaseRate": 540,
      "salesRate": 700,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 540,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 600,
      "mstatus": "Active",
      "_id": "61e8200e1ef3386c576f6968",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cdc501cac184712e756fe0",
        "menu_name": "BLACK FOREST (1 KG)"
      },
      "menu_desc": "BLACK FOREST ",
      "purchaseRate": 540,
      "salesRate": 700,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 540,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e81fe91ef3386c576f692b",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf583ec2bfd3968b904606",
        "menu_name": "CHOCOLATE TRUFFLE - 1 KG"
      },
      "menu_desc": "CHOCOLATE TRUFFLE ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e81fa51ef3386c576f68de",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf50bcc2bfd3968b902343",
        "menu_name": "VANCHO"
      },
      "menu_desc": "VANCHO CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e7baf41ef3386c576e71e1",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcab435595c4a74758f5d8",
        "menu_name": "CHICKEN BIRIYANI"
      },
      "menu_desc": "CHICKEN BIRIYANI",
      "purchaseRate": 135,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "16:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e7ba831ef3386c576e71ce",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf1d7efbd88970c8b26d03",
        "menu_name": "EGG BIRIYANI "
      },
      "menu_desc": "EGG BIRIYANI",
      "purchaseRate": 100,
      "salesRate": 100,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 100,
      "availableTime": "12:00",
      "closingTime": "16:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 155,
      "mstatus": "Active",
      "_id": "61e7ba381ef3386c576e71bc",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcd388420218103a5292e2",
        "menu_name": "MIXED FRIED RICE"
      },
      "menu_desc": "MIXED FRIED RICE",
      "purchaseRate": 155,
      "salesRate": 155,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 155,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e7b9e91ef3386c576e71a9",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bec4c0344b0d4100749d2c",
        "menu_name": "CHICKEN FRIED RICE"
      },
      "menu_desc": "CHICKEN FRIEDRICE",
      "purchaseRate": 135,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e7b9bc1ef3386c576e7195",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61be1d27eeca7bd7222da4d7",
        "menu_name": "EGG FRIED RICE"
      },
      "menu_desc": "EGG FRIEDRICE",
      "purchaseRate": 120,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 120,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e7b9851ef3386c576e717c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61be1c4ceeca7bd7222da4d6",
        "menu_name": "VEG FRIED RICE"
      },
      "menu_desc": "VEG FRIEDRICE",
      "purchaseRate": 110,
      "salesRate": 110,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 110,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e7b9141ef3386c576e713f",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf822efbd88970c8b26d8f",
        "menu_name": "MEALS"
      },
      "menu_desc": "MEALS",
      "purchaseRate": 70,
      "salesRate": 70,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 70,
      "availableTime": "12:00",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e7b8d51ef3386c576e712c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf285dfbd88970c8b26d18",
        "menu_name": "GHEE ROAST"
      },
      "menu_desc": "GHEE ROAST",
      "purchaseRate": 60,
      "salesRate": 60,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 60,
      "availableTime": "17:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e7b88e1ef3386c576e7118",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf1a76fbd88970c8b26cfa",
        "menu_name": "MASALA DOSA"
      },
      "menu_desc": "MASALA DOSA",
      "purchaseRate": 60,
      "salesRate": 60,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 60,
      "availableTime": "17:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7f51ef3386c576e706d",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61b9b5f7f0c292acc0387e29",
        "menu_name": "PORATTA"
      },
      "menu_desc": "POTATTA",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7cc1ef3386c576e704d",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61ba2fe1f0c292acc0387e53",
        "menu_name": "CHAPPATHI"
      },
      "menu_desc": "CHAPPATI",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b79d1ef3386c576e702c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bb3e31f0c292acc0387eba",
        "menu_name": "APPAM"
      },
      "menu_desc": "APAM",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b76b1ef3386c576e6e5f",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc94095595c4a74758f5ba",
        "menu_name": "DOSA"
      },
      "menu_desc": "DOSA",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b73e1ef3386c576e6e0a",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc95885595c4a74758f5be",
        "menu_name": "IDIYAPPAM"
      },
      "menu_desc": "IDIYAPPAM",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7131ef3386c576e6dd3",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc94f75595c4a74758f5bd",
        "menu_name": "IDLI "
      },
      "menu_desc": "IDLI",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6dafc1ef3386c576e1416",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e69f9b1ef3386c576db5a8",
        "menu_name": "PINEAPPLE SMOOTHIES"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6dac51ef3386c576e13f9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 110.4,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 110.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6da691ef3386c576e13e7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6da281ef3386c576e13ba",
        "menu_name": "PAPAYA SMOOTHIES"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61e6d5ff1ef3386c576e09ff",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6d5b81ef3386c576e0957",
        "menu_name": "PAPPAYA SHAKE WITH ICE CREAM"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 73.6,
      "salesRate": 110,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 73.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61e6d4191ef3386c576e0541",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf6da7fbd88970c8b26d6d",
        "menu_name": "PANEER TIKKA "
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 147.2,
      "salesRate": 190,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 151.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e6d38c1ef3386c576e0523",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61dafc3aaf6f46c10db469f4",
        "menu_name": "PANEER 65"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 138,
      "salesRate": 180,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 138,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6d31f1ef3386c576e0273",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f692ba4a0042daaf6e29",
        "menu_name": "ORANGE MOJITTO"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6d2de1ef3386c576e0133",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f5faba4a0042daaf6bb3",
        "menu_name": "ORANGE DELIGHT ICE CREAM SHAKE"
      },
      "menu_desc": "TEASTY SHAKE",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6d28e1ef3386c576dfec9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f4fcba4a0042daaf6840",
        "menu_name": "NUTTELLA MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 119.6,
      "salesRate": 160,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 119.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 145,
      "mstatus": "Active",
      "_id": "61e6d23d1ef3386c576dfd14",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bd98905884267ab4202661",
        "menu_name": "NADAN CHICKEN CURRY"
      },
      "menu_desc": "SPICEY AND TEASTY",
      "purchaseRate": 133.4,
      "salesRate": 175,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 133.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6d20c1ef3386c576dfcf9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f25eba4a0042daaf6347",
        "menu_name": "MUTTON STEW"
      },
      "menu_desc": "WELL TEASTED",
      "purchaseRate": 262.2,
      "salesRate": 320,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 295,
      "mstatus": "Active",
      "_id": "61e6d1c61ef3386c576dfce7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f1feba4a0042daaf61f4",
        "menu_name": "MUTTON ROGAN JOSH"
      },
      "menu_desc": "SPICY WELL TEASTED DISH",
      "purchaseRate": 271.4,
      "salesRate": 330,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 271.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6d1311ef3386c576dfc6d",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf12aafbd88970c8b26cda",
        "menu_name": "MUTTON ROAST"
      },
      "menu_desc": "SPICY WELL TEASTED DISH",
      "purchaseRate": 262.2,
      "salesRate": 320,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 305,
      "mstatus": "Active",
      "_id": "61e6d0cc1ef3386c576dfba8",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf10eafbd88970c8b26cd1",
        "menu_name": "MUTTON PEPPER FRY"
      },
      "menu_desc": "SPICY PEPPER",
      "purchaseRate": 280.6,
      "salesRate": 340,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 280.6,
      "availableTime": "11:00",
      "closingTime": "22:10",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61e6d0681ef3386c576dfb26",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6d02c1ef3386c576dfa31",
        "menu_name": "MUTTON KUZHIMANTHI"
      },
      "menu_desc": "SPICY AND WELL TEASTY DISH",
      "purchaseRate": 331.2,
      "salesRate": 400,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 331.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6cf851ef3386c576df9eb",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf120cfbd88970c8b26cd7",
        "menu_name": "MUTTON CURRY"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 262.2,
      "salesRate": 310,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e6cf3f1ef3386c576df9d4",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e543ca2b0ea6440c4df677",
        "menu_name": "MUSSAMBI"
      },
      "menu_desc": "TEASTY DRINKS",
      "purchaseRate": 64.4,
      "salesRate": 100,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 64.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 155,
      "mstatus": "Active",
      "_id": "61e6ced81ef3386c576df95f",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e43245ba4a0042daaf2507",
        "menu_name": "MUSHROOM MASALA"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 142.6,
      "salesRate": 185,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 142.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6c7371ef3386c576df033",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e431dbba4a0042daaf2366",
        "menu_name": "MUNCH MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "yummy",
      "purchaseRate": 106.8,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 106.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e6bec21ef3386c576de08b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "PERI PERI ALFAHAM QTR",
      "purchaseRate": 121.5,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 121.5,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e6be8c1ef3386c576de071",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "PERI PERI ALFAHAM HALF",
      "purchaseRate": 216,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 450,
      "mstatus": "Active",
      "_id": "61e6be571ef3386c576de05e",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e022ff533418ce8419890e",
        "menu_name": " PERI PERI AL FAHAM  FULL "
      },
      "menu_desc": "PERI PERI ALFAHAM FULL",
      "purchaseRate": 405,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 405,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e6be261ef3386c576de04c",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d19ac0874e7805ac347553",
        "menu_name": "KANTHARI AL FAHAM  QTR"
      },
      "menu_desc": "KANTHARI ALFAHAM QTR",
      "purchaseRate": 121.5,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 121.5,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61e6bdf61ef3386c576de034",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d19a38874e7805ac347468",
        "menu_name": "KANTHARI AL FAHAM HALF"
      },
      "menu_desc": "KANTHARI ALFAHAM HALF",
      "purchaseRate": 225,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 470,
      "mstatus": "Active",
      "_id": "61e6bdbf1ef3386c576de022",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d1991a874e7805ac3473ef",
        "menu_name": "KANTHARI AL FAHAM FULL"
      },
      "menu_desc": "KANTHARI ALFAHAM FULL",
      "purchaseRate": 423,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 423,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6bd7f1ef3386c576de00f",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d42fe44d69ea0276c76573",
        "menu_name": "MEXICAN ALFAHAM QTR"
      },
      "menu_desc": "MEXICAN ALFAHAM QTR",
      "purchaseRate": 117,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e6bd4a1ef3386c576ddff1",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d42e2b4d69ea0276c76402",
        "menu_name": "MEXICAN AL FAHAM HALF"
      },
      "menu_desc": "MEXICAN ALFAHAM HALF",
      "purchaseRate": 216,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 450,
      "mstatus": "Active",
      "_id": "61e6bd1b1ef3386c576ddf88",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf8d2cfbd88970c8b26d9d",
        "menu_name": "MEXICAN AL FAHAM FULL"
      },
      "menu_desc": "MEXICAN ALFAHAM FULL",
      "purchaseRate": 405,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 405,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bce71ef3386c576ddf5d",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9d865595c4a74758f5c7",
        "menu_name": "AL FAHAM QUARTER"
      },
      "menu_desc": "AL FAHAM QTR",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61e6bcbb1ef3386c576dde78",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9bec5595c4a74758f5c5",
        "menu_name": "AL FAHAM HALF"
      },
      "menu_desc": "AL FAHAM HALF",
      "purchaseRate": 189,
      "salesRate": 220,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 189,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 440,
      "mstatus": "Active",
      "_id": "61e6bc8f1ef3386c576dde63",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9ae95595c4a74758f5c3",
        "menu_name": "AL FAHAM FULL"
      },
      "menu_desc": "AL FAHAM FULL",
      "purchaseRate": 396,
      "salesRate": 440,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 396,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 30,
      "mstatus": "Active",
      "_id": "61e6bc261ef3386c576ddd46",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e430cbba4a0042daaf1f30",
        "menu_name": "MINT/GINGER LIME/"
      },
      "menu_desc": "COOL DRINK",
      "purchaseRate": 27.6,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 27.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 190,
      "mstatus": "Active",
      "_id": "61e6bc241ef3386c576ddd2b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d561794d69ea0276c94fa9",
        "menu_name": "AL FAHAM MANDI QTR"
      },
      "menu_desc": "AL FAHAM MANDI QTR",
      "purchaseRate": 171,
      "salesRate": 190,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 171,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 15,
      "mstatus": "Active",
      "_id": "61e6bbe71ef3386c576ddba2",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e43078ba4a0042daaf1d07",
        "menu_name": "MINERAL WATER"
      },
      "menu_desc": "WATER",
      "purchaseRate": 13.8,
      "salesRate": 45,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 13.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 380,
      "mstatus": "Active",
      "_id": "61e6bbdf1ef3386c576ddb94",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d561624d69ea0276c94fa2",
        "menu_name": "AL FAHAM MANDI  HALF"
      },
      "menu_desc": "AL FAHAM MANDI HALF",
      "purchaseRate": 342,
      "salesRate": 380,
      "packingCharge": 3,
      "discount": "0",
      "discamountAmount": 342,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 700,
      "mstatus": "Active",
      "_id": "61e6bb981ef3386c576ddaff",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d5614f4d69ea0276c94f82",
        "menu_name": "AL FAHAM MANDHI FULL"
      },
      "menu_desc": "ALFAHAM MANDI FULL",
      "purchaseRate": 630,
      "salesRate": 720,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 630,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6bb7e1ef3386c576ddab9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d42fe44d69ea0276c76573",
        "menu_name": "MEXICAN ALFAHAM QTR"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bb411ef3386c576dda9b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcd2c1420218103a5292de",
        "menu_name": "BEEF BIRIYANI "
      },
      "menu_desc": "BEEF BIRIYANI",
      "purchaseRate": 108,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "12:45",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bb0d1ef3386c576dda7c",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcab435595c4a74758f5d8",
        "menu_name": "CHICKEN BIRIYANI"
      },
      "menu_desc": "CHICKEN BIRIYANI",
      "purchaseRate": 108,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "12:45",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6ba2d1ef3386c576dd8e0",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e3bf2baba46abeb223322b",
        "menu_name": "CHICKEN SHAWARMA PLATE"
      },
      "menu_desc": "CHICKEN SHAWARMA PLATE",
      "purchaseRate": 99,
      "salesRate": 110,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e6b9df1ef3386c576dd80e",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf182ffbd88970c8b26cf5",
        "menu_name": "SHAWARMA ROLL"
      },
      "menu_desc": "SHAWARMA ROLL",
      "purchaseRate": 63,
      "salesRate": 70,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 63,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6b98c1ef3386c576dd7cb",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf28a6fbd88970c8b26d19",
        "menu_name": "RUMALI FULL MEAT SHAWARMA"
      },
      "menu_desc": "RUMALI FULL MEAT SHAWARMA",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b4291ef3386c576dce57",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42f64ba4a0042daaf177f",
        "menu_name": "MANTHI /KABSA RICE/"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 82.8,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6b3e91ef3386c576dce2c",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42efbba4a0042daaf15cc",
        "menu_name": "MANGO SMOOTHIES"
      },
      "menu_desc": "YUMMY LOOK",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6b3a61ef3386c576dcd76",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42eabba4a0042daaf1491",
        "menu_name": "MANGO MOJITTO"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 50,
      "mstatus": "Active",
      "_id": "61e6b3131ef3386c576dc9f3",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6b2741ef3386c576dc987",
        "menu_name": "MANGO MILK JUICE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 46,
      "salesRate": 80,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 46,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b1921ef3386c576dc82d",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42e46ba4a0042daaf12b3",
        "menu_name": "MANGO ICE CREAM"
      },
      "menu_desc": "YUMMY LOOK",
      "purchaseRate": 82.8,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b1581ef3386c576dc81b",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42da1ba4a0042daaf0f9d",
        "menu_name": "MAJESTIC VANILA ICE CREAM SHAKE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 82.8,
      "salesRate": 125,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61e6b1121ef3386c576dc80a",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42d2cba4a0042daaf0d5f",
        "menu_name": "MAGIC MALABAR FALOODA"
      },
      "menu_desc": "YUMMY AND TEASTY",
      "purchaseRate": 165.6,
      "salesRate": 210,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 165.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6acb21ef3386c576dc2b0",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42c1fba4a0042daaf0798",
        "menu_name": "LICHY MOJITTO"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6ac6d1ef3386c576dc28a",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42baaba4a0042daaf0550",
        "menu_name": "KITKAT MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 119.6,
      "salesRate": 160,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 119.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6ac071ef3386c576dc1a7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42b39ba4a0042daaf03f8",
        "menu_name": "KING DRY FRUIT SHAKE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 64.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e6ab991ef3386c576dc0d5",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "PERI PERI ALFAHAM QTR",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 270,
      "mstatus": "Active",
      "_id": "61e6ab531ef3386c576dc0b8",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "PERI PERI ALFAHAM HALF",
      "purchaseRate": 243,
      "salesRate": 270,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 243,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 470,
      "mstatus": "Active",
      "_id": "61e6aaea1ef3386c576dc0a5",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e022ff533418ce8419890e",
        "menu_name": " PERI PERI AL FAHAM  FULL "
      },
      "menu_desc": "PERI PERI ALFAHAM FULL",
      "purchaseRate": 423,
      "salesRate": 470,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 423,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e933b01ef3386c576fd6dc",
      "shop_id": {
        "_id": "61b9ecb0f0c292acc0387e34",
        "shop_name": "MURALI HOTEL"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61dfe56fbe8cc24f938039c8",
        "menu_name": "PANEER KADAI "
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 135,
      "salesRate": 173,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e91a411ef3386c576fb980",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e919cd1ef3386c576fb87c",
        "menu_name": "FULL MEAT PLATE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e918c01ef3386c576fb844",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e9183e1ef3386c576fb816",
        "menu_name": "FULL MEAT ROLL"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 81,
      "salesRate": 90,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 81,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e915fb1ef3386c576fb758",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e01bdf533418ce841912e7",
        "menu_name": "PLATE SHAWARMA "
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 90,
      "salesRate": 100,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 90,
      "availableTime": "03:00",
      "closingTime": "19:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e9158d1ef3386c576fb745",
      "shop_id": {
        "_id": "61e914631ef3386c576fb6fb",
        "shop_name": "ICE LAND"
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf182ffbd88970c8b26cf5",
        "menu_name": "SHAWARMA ROLL"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 54,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 54,
      "availableTime": "03:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e90f621ef3386c576fb2c4",
      "shop_id": {
        "_id": "61c4affc5fbdb1ea4b36589a",
        "shop_name": "BAKE HOUSE."
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61cc73bfec0261ad83e3a9b6",
        "menu_name": "VEG BURGER"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 62.4,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 62.4,
      "availableTime": "09:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 220,
      "mstatus": "Active",
      "_id": "61e909531ef3386c576fad65",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 202.4,
      "salesRate": 260,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 202.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61e9062a1ef3386c576fac26",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e019a3533418ce84185b90",
        "menu_name": "SHAWAI HALF"
      },
      "menu_desc": "SPICY AND TEASTY",
      "purchaseRate": 193.2,
      "salesRate": 245,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 193.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e905c11ef3386c576fab72",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e01a0a533418ce841880fd",
        "menu_name": "SHAWAI QTR"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e903311ef3386c576faa37",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e9027f1ef3386c576fa992",
        "menu_name": "ROYAL FRUIT SALAD"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 110.4,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 110.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e8237b1ef3386c576f6bb6",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf51cbc2bfd3968b90262e",
        "menu_name": "CHOCO VELVET"
      },
      "menu_desc": "CHOCO VELVET ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e823561ef3386c576f6ba5",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf5600c2bfd3968b903c09",
        "menu_name": "MILK TRUFFLE- 1 KG"
      },
      "menu_desc": "MILK TRUFFLE ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e822b31ef3386c576f6ab0",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf53a5c2bfd3968b902db3",
        "menu_name": "OREO CAKE"
      },
      "menu_desc": "OREO CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 950,
      "mstatus": "Active",
      "_id": "61e8226d1ef3386c576f6a9a",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf52abc2bfd3968b902afa",
        "menu_name": "RED BEE"
      },
      "menu_desc": "RED BEE CAKE 1KG",
      "purchaseRate": 855,
      "salesRate": 1050,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 855,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e820e31ef3386c576f6a39",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61d067c3007077db35694a57",
        "menu_name": "IRISH COFFEE CAKE "
      },
      "menu_desc": "IRISH CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 600,
      "mstatus": "Active",
      "_id": "61e820791ef3386c576f6a27",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cdc6c9cac184712e756ffa",
        "menu_name": "WHITE FOREST "
      },
      "menu_desc": "WHITE FOREST 1KG",
      "purchaseRate": 540,
      "salesRate": 700,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 540,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 600,
      "mstatus": "Active",
      "_id": "61e8200e1ef3386c576f6968",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cdc501cac184712e756fe0",
        "menu_name": "BLACK FOREST (1 KG)"
      },
      "menu_desc": "BLACK FOREST ",
      "purchaseRate": 540,
      "salesRate": 700,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 540,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e81fe91ef3386c576f692b",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf583ec2bfd3968b904606",
        "menu_name": "CHOCOLATE TRUFFLE - 1 KG"
      },
      "menu_desc": "CHOCOLATE TRUFFLE ",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 900,
      "mstatus": "Active",
      "_id": "61e81fa51ef3386c576f68de",
      "shop_id": {
        "_id": "61dc3106af6f46c10db7bd5d",
        "shop_name": "PASTRYWORLD"
      },
      "location_id": {
        "_id": "61baf84ef0c292acc0387ea2",
        "location": "Pandalam"
      },
      "menu_id": {
        "_id": "61cf50bcc2bfd3968b902343",
        "menu_name": "VANCHO"
      },
      "menu_desc": "VANCHO CAKE 1KG",
      "purchaseRate": 810,
      "salesRate": 1000,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 810,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e7baf41ef3386c576e71e1",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcab435595c4a74758f5d8",
        "menu_name": "CHICKEN BIRIYANI"
      },
      "menu_desc": "CHICKEN BIRIYANI",
      "purchaseRate": 135,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "16:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e7ba831ef3386c576e71ce",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf1d7efbd88970c8b26d03",
        "menu_name": "EGG BIRIYANI "
      },
      "menu_desc": "EGG BIRIYANI",
      "purchaseRate": 100,
      "salesRate": 100,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 100,
      "availableTime": "12:00",
      "closingTime": "16:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 155,
      "mstatus": "Active",
      "_id": "61e7ba381ef3386c576e71bc",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcd388420218103a5292e2",
        "menu_name": "MIXED FRIED RICE"
      },
      "menu_desc": "MIXED FRIED RICE",
      "purchaseRate": 155,
      "salesRate": 155,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 155,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e7b9e91ef3386c576e71a9",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bec4c0344b0d4100749d2c",
        "menu_name": "CHICKEN FRIED RICE"
      },
      "menu_desc": "CHICKEN FRIEDRICE",
      "purchaseRate": 135,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 135,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e7b9bc1ef3386c576e7195",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61be1d27eeca7bd7222da4d7",
        "menu_name": "EGG FRIED RICE"
      },
      "menu_desc": "EGG FRIEDRICE",
      "purchaseRate": 120,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 120,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e7b9851ef3386c576e717c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61be1c4ceeca7bd7222da4d6",
        "menu_name": "VEG FRIED RICE"
      },
      "menu_desc": "VEG FRIEDRICE",
      "purchaseRate": 110,
      "salesRate": 110,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 110,
      "availableTime": "12:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e7b9141ef3386c576e713f",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf822efbd88970c8b26d8f",
        "menu_name": "MEALS"
      },
      "menu_desc": "MEALS",
      "purchaseRate": 70,
      "salesRate": 70,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 70,
      "availableTime": "12:00",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e7b8d51ef3386c576e712c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf285dfbd88970c8b26d18",
        "menu_name": "GHEE ROAST"
      },
      "menu_desc": "GHEE ROAST",
      "purchaseRate": 60,
      "salesRate": 60,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 60,
      "availableTime": "17:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 60,
      "mstatus": "Active",
      "_id": "61e7b88e1ef3386c576e7118",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf1a76fbd88970c8b26cfa",
        "menu_name": "MASALA DOSA"
      },
      "menu_desc": "MASALA DOSA",
      "purchaseRate": 60,
      "salesRate": 60,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 60,
      "availableTime": "17:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7f51ef3386c576e706d",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61b9b5f7f0c292acc0387e29",
        "menu_name": "PORATTA"
      },
      "menu_desc": "POTATTA",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7cc1ef3386c576e704d",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61ba2fe1f0c292acc0387e53",
        "menu_name": "CHAPPATHI"
      },
      "menu_desc": "CHAPPATI",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b79d1ef3386c576e702c",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bb3e31f0c292acc0387eba",
        "menu_name": "APPAM"
      },
      "menu_desc": "APAM",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b76b1ef3386c576e6e5f",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc94095595c4a74758f5ba",
        "menu_name": "DOSA"
      },
      "menu_desc": "DOSA",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b73e1ef3386c576e6e0a",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc95885595c4a74758f5be",
        "menu_name": "IDIYAPPAM"
      },
      "menu_desc": "IDIYAPPAM",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 10,
      "mstatus": "Active",
      "_id": "61e7b7131ef3386c576e6dd3",
      "shop_id": {
        "_id": "61bdde1613eab893a8c7016b",
        "shop_name": " RAJANS HOTEL"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc94f75595c4a74758f5bd",
        "menu_name": "IDLI "
      },
      "menu_desc": "IDLI",
      "purchaseRate": 10,
      "salesRate": 10,
      "packingCharge": 0,
      "discount": "0",
      "discamountAmount": 10,
      "availableTime": "08:00",
      "closingTime": "10:30",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6dafc1ef3386c576e1416",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e69f9b1ef3386c576db5a8",
        "menu_name": "PINEAPPLE SMOOTHIES"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6dac51ef3386c576e13f9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 110.4,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 110.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6da691ef3386c576e13e7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6da281ef3386c576e13ba",
        "menu_name": "PAPAYA SMOOTHIES"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 80,
      "mstatus": "Active",
      "_id": "61e6d5ff1ef3386c576e09ff",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6d5b81ef3386c576e0957",
        "menu_name": "PAPPAYA SHAKE WITH ICE CREAM"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 73.6,
      "salesRate": 110,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 73.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 160,
      "mstatus": "Active",
      "_id": "61e6d4191ef3386c576e0541",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf6da7fbd88970c8b26d6d",
        "menu_name": "PANEER TIKKA "
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 147.2,
      "salesRate": 190,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 151.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 150,
      "mstatus": "Active",
      "_id": "61e6d38c1ef3386c576e0523",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61dafc3aaf6f46c10db469f4",
        "menu_name": "PANEER 65"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 138,
      "salesRate": 180,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 138,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6d31f1ef3386c576e0273",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f692ba4a0042daaf6e29",
        "menu_name": "ORANGE MOJITTO"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6d2de1ef3386c576e0133",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f5faba4a0042daaf6bb3",
        "menu_name": "ORANGE DELIGHT ICE CREAM SHAKE"
      },
      "menu_desc": "TEASTY SHAKE",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6d28e1ef3386c576dfec9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f4fcba4a0042daaf6840",
        "menu_name": "NUTTELLA MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 119.6,
      "salesRate": 160,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 119.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 145,
      "mstatus": "Active",
      "_id": "61e6d23d1ef3386c576dfd14",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bd98905884267ab4202661",
        "menu_name": "NADAN CHICKEN CURRY"
      },
      "menu_desc": "SPICEY AND TEASTY",
      "purchaseRate": 133.4,
      "salesRate": 175,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 133.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6d20c1ef3386c576dfcf9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f25eba4a0042daaf6347",
        "menu_name": "MUTTON STEW"
      },
      "menu_desc": "WELL TEASTED",
      "purchaseRate": 262.2,
      "salesRate": 320,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 295,
      "mstatus": "Active",
      "_id": "61e6d1c61ef3386c576dfce7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e4f1feba4a0042daaf61f4",
        "menu_name": "MUTTON ROGAN JOSH"
      },
      "menu_desc": "SPICY WELL TEASTED DISH",
      "purchaseRate": 271.4,
      "salesRate": 330,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 271.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6d1311ef3386c576dfc6d",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf12aafbd88970c8b26cda",
        "menu_name": "MUTTON ROAST"
      },
      "menu_desc": "SPICY WELL TEASTED DISH",
      "purchaseRate": 262.2,
      "salesRate": 320,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 305,
      "mstatus": "Active",
      "_id": "61e6d0cc1ef3386c576dfba8",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf10eafbd88970c8b26cd1",
        "menu_name": "MUTTON PEPPER FRY"
      },
      "menu_desc": "SPICY PEPPER",
      "purchaseRate": 280.6,
      "salesRate": 340,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 280.6,
      "availableTime": "11:00",
      "closingTime": "22:10",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 360,
      "mstatus": "Active",
      "_id": "61e6d0681ef3386c576dfb26",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6d02c1ef3386c576dfa31",
        "menu_name": "MUTTON KUZHIMANTHI"
      },
      "menu_desc": "SPICY AND WELL TEASTY DISH",
      "purchaseRate": 331.2,
      "salesRate": 400,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 331.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 285,
      "mstatus": "Active",
      "_id": "61e6cf851ef3386c576df9eb",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61bf120cfbd88970c8b26cd7",
        "menu_name": "MUTTON CURRY"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 262.2,
      "salesRate": 310,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 262.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e6cf3f1ef3386c576df9d4",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e543ca2b0ea6440c4df677",
        "menu_name": "MUSSAMBI"
      },
      "menu_desc": "TEASTY DRINKS",
      "purchaseRate": 64.4,
      "salesRate": 100,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 64.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 155,
      "mstatus": "Active",
      "_id": "61e6ced81ef3386c576df95f",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e43245ba4a0042daaf2507",
        "menu_name": "MUSHROOM MASALA"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 142.6,
      "salesRate": 185,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 142.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6c7371ef3386c576df033",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e431dbba4a0042daaf2366",
        "menu_name": "MUNCH MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "yummy",
      "purchaseRate": 106.8,
      "salesRate": 150,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 106.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e6bec21ef3386c576de08b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "PERI PERI ALFAHAM QTR",
      "purchaseRate": 121.5,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 121.5,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e6be8c1ef3386c576de071",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "PERI PERI ALFAHAM HALF",
      "purchaseRate": 216,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 450,
      "mstatus": "Active",
      "_id": "61e6be571ef3386c576de05e",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e022ff533418ce8419890e",
        "menu_name": " PERI PERI AL FAHAM  FULL "
      },
      "menu_desc": "PERI PERI ALFAHAM FULL",
      "purchaseRate": 405,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 405,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 135,
      "mstatus": "Active",
      "_id": "61e6be261ef3386c576de04c",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d19ac0874e7805ac347553",
        "menu_name": "KANTHARI AL FAHAM  QTR"
      },
      "menu_desc": "KANTHARI ALFAHAM QTR",
      "purchaseRate": 121.5,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 121.5,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 250,
      "mstatus": "Active",
      "_id": "61e6bdf61ef3386c576de034",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d19a38874e7805ac347468",
        "menu_name": "KANTHARI AL FAHAM HALF"
      },
      "menu_desc": "KANTHARI ALFAHAM HALF",
      "purchaseRate": 225,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 225,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 470,
      "mstatus": "Active",
      "_id": "61e6bdbf1ef3386c576de022",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d1991a874e7805ac3473ef",
        "menu_name": "KANTHARI AL FAHAM FULL"
      },
      "menu_desc": "KANTHARI ALFAHAM FULL",
      "purchaseRate": 423,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 423,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6bd7f1ef3386c576de00f",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d42fe44d69ea0276c76573",
        "menu_name": "MEXICAN ALFAHAM QTR"
      },
      "menu_desc": "MEXICAN ALFAHAM QTR",
      "purchaseRate": 117,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 240,
      "mstatus": "Active",
      "_id": "61e6bd4a1ef3386c576ddff1",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d42e2b4d69ea0276c76402",
        "menu_name": "MEXICAN AL FAHAM HALF"
      },
      "menu_desc": "MEXICAN ALFAHAM HALF",
      "purchaseRate": 216,
      "salesRate": 250,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 216,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 450,
      "mstatus": "Active",
      "_id": "61e6bd1b1ef3386c576ddf88",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf8d2cfbd88970c8b26d9d",
        "menu_name": "MEXICAN AL FAHAM FULL"
      },
      "menu_desc": "MEXICAN ALFAHAM FULL",
      "purchaseRate": 405,
      "salesRate": 470,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 405,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bce71ef3386c576ddf5d",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9d865595c4a74758f5c7",
        "menu_name": "AL FAHAM QUARTER"
      },
      "menu_desc": "AL FAHAM QTR",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 210,
      "mstatus": "Active",
      "_id": "61e6bcbb1ef3386c576dde78",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9bec5595c4a74758f5c5",
        "menu_name": "AL FAHAM HALF"
      },
      "menu_desc": "AL FAHAM HALF",
      "purchaseRate": 189,
      "salesRate": 220,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 189,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 440,
      "mstatus": "Active",
      "_id": "61e6bc8f1ef3386c576dde63",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bc9ae95595c4a74758f5c3",
        "menu_name": "AL FAHAM FULL"
      },
      "menu_desc": "AL FAHAM FULL",
      "purchaseRate": 396,
      "salesRate": 440,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 396,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 30,
      "mstatus": "Active",
      "_id": "61e6bc261ef3386c576ddd46",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e430cbba4a0042daaf1f30",
        "menu_name": "MINT/GINGER LIME/"
      },
      "menu_desc": "COOL DRINK",
      "purchaseRate": 27.6,
      "salesRate": 60,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 27.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 190,
      "mstatus": "Active",
      "_id": "61e6bc241ef3386c576ddd2b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d561794d69ea0276c94fa9",
        "menu_name": "AL FAHAM MANDI QTR"
      },
      "menu_desc": "AL FAHAM MANDI QTR",
      "purchaseRate": 171,
      "salesRate": 190,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 171,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 15,
      "mstatus": "Active",
      "_id": "61e6bbe71ef3386c576ddba2",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e43078ba4a0042daaf1d07",
        "menu_name": "MINERAL WATER"
      },
      "menu_desc": "WATER",
      "purchaseRate": 13.8,
      "salesRate": 45,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 13.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 380,
      "mstatus": "Active",
      "_id": "61e6bbdf1ef3386c576ddb94",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d561624d69ea0276c94fa2",
        "menu_name": "AL FAHAM MANDI  HALF"
      },
      "menu_desc": "AL FAHAM MANDI HALF",
      "purchaseRate": 342,
      "salesRate": 380,
      "packingCharge": 3,
      "discount": "0",
      "discamountAmount": 342,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 700,
      "mstatus": "Active",
      "_id": "61e6bb981ef3386c576ddaff",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61d5614f4d69ea0276c94f82",
        "menu_name": "AL FAHAM MANDHI FULL"
      },
      "menu_desc": "ALFAHAM MANDI FULL",
      "purchaseRate": 630,
      "salesRate": 720,
      "packingCharge": 4,
      "discount": "0",
      "discamountAmount": 630,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6bb7e1ef3386c576ddab9",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61d42fe44d69ea0276c76573",
        "menu_name": "MEXICAN ALFAHAM QTR"
      },
      "menu_desc": "SPICY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bb411ef3386c576dda9b",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcd2c1420218103a5292de",
        "menu_name": "BEEF BIRIYANI "
      },
      "menu_desc": "BEEF BIRIYANI",
      "purchaseRate": 108,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "12:45",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6bb0d1ef3386c576dda7c",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bcab435595c4a74758f5d8",
        "menu_name": "CHICKEN BIRIYANI"
      },
      "menu_desc": "CHICKEN BIRIYANI",
      "purchaseRate": 108,
      "salesRate": 135,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "12:45",
      "closingTime": "15:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6ba2d1ef3386c576dd8e0",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e3bf2baba46abeb223322b",
        "menu_name": "CHICKEN SHAWARMA PLATE"
      },
      "menu_desc": "CHICKEN SHAWARMA PLATE",
      "purchaseRate": 99,
      "salesRate": 110,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 99,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 70,
      "mstatus": "Active",
      "_id": "61e6b9df1ef3386c576dd80e",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf182ffbd88970c8b26cf5",
        "menu_name": "SHAWARMA ROLL"
      },
      "menu_desc": "SHAWARMA ROLL",
      "purchaseRate": 63,
      "salesRate": 70,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 63,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 120,
      "mstatus": "Active",
      "_id": "61e6b98c1ef3386c576dd7cb",
      "shop_id": {
        "_id": "61bca3b85595c4a74758f5d1",
        "shop_name": "ARABIAN GRILLS ."
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61bf28a6fbd88970c8b26d19",
        "menu_name": "RUMALI FULL MEAT SHAWARMA"
      },
      "menu_desc": "RUMALI FULL MEAT SHAWARMA",
      "purchaseRate": 108,
      "salesRate": 120,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 108,
      "availableTime": "15:30",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b4291ef3386c576dce57",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42f64ba4a0042daaf177f",
        "menu_name": "MANTHI /KABSA RICE/"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 82.8,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6b3e91ef3386c576dce2c",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42efbba4a0042daaf15cc",
        "menu_name": "MANGO SMOOTHIES"
      },
      "menu_desc": "YUMMY LOOK",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 100,
      "mstatus": "Active",
      "_id": "61e6b3a61ef3386c576dcd76",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42eabba4a0042daaf1491",
        "menu_name": "MANGO MOJITTO"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 92,
      "salesRate": 130,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 92,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 50,
      "mstatus": "Active",
      "_id": "61e6b3131ef3386c576dc9f3",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e6b2741ef3386c576dc987",
        "menu_name": "MANGO MILK JUICE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 46,
      "salesRate": 80,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 46,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b1921ef3386c576dc82d",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42e46ba4a0042daaf12b3",
        "menu_name": "MANGO ICE CREAM"
      },
      "menu_desc": "YUMMY LOOK",
      "purchaseRate": 82.8,
      "salesRate": 120,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 90,
      "mstatus": "Active",
      "_id": "61e6b1581ef3386c576dc81b",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42da1ba4a0042daaf0f9d",
        "menu_name": "MAJESTIC VANILA ICE CREAM SHAKE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 82.8,
      "salesRate": 125,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 82.8,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 180,
      "mstatus": "Active",
      "_id": "61e6b1121ef3386c576dc80a",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42d2cba4a0042daaf0d5f",
        "menu_name": "MAGIC MALABAR FALOODA"
      },
      "menu_desc": "YUMMY AND TEASTY",
      "purchaseRate": 165.6,
      "salesRate": 210,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 165.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6acb21ef3386c576dc2b0",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42c1fba4a0042daaf0798",
        "menu_name": "LICHY MOJITTO"
      },
      "menu_desc": "TEASTY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 101.2,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 130,
      "mstatus": "Active",
      "_id": "61e6ac6d1ef3386c576dc28a",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42baaba4a0042daaf0550",
        "menu_name": "KITKAT MONSTAR SHAKE CHOCOLATE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 119.6,
      "salesRate": 160,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 119.6,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 110,
      "mstatus": "Active",
      "_id": "61e6ac071ef3386c576dc1a7",
      "shop_id": {
        "_id": "61c0d6f0e7e71d910cc47925",
        "shop_name": "CHICKEN CHICAGO "
      },
      "location_id": {
        "_id": "5fd34af4f833aa88f322145a",
        "location": "HARIPAD"
      },
      "menu_id": {
        "_id": "61e42b39ba4a0042daaf03f8",
        "menu_name": "KING DRY FRUIT SHAKE"
      },
      "menu_desc": "YUMMY",
      "purchaseRate": 101.2,
      "salesRate": 140,
      "packingCharge": 5,
      "discount": "0",
      "discamountAmount": 64.4,
      "availableTime": "11:00",
      "closingTime": "21:00",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 140,
      "mstatus": "Active",
      "_id": "61e6ab991ef3386c576dc0d5",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e0235a533418ce84198af6",
        "menu_name": "PERI PERI ALFAHAM QTR"
      },
      "menu_desc": "PERI PERI ALFAHAM QTR",
      "purchaseRate": 126,
      "salesRate": 140,
      "packingCharge": 1,
      "discount": "0",
      "discamountAmount": 117,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 270,
      "mstatus": "Active",
      "_id": "61e6ab531ef3386c576dc0b8",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e02335533418ce841989e7",
        "menu_name": "PERI PERI AL FAHAM HALF"
      },
      "menu_desc": "PERI PERI ALFAHAM HALF",
      "purchaseRate": 243,
      "salesRate": 270,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 243,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    },
    {
      "shopSaleRate": 470,
      "mstatus": "Active",
      "_id": "61e6aaea1ef3386c576dc0a5",
      "shop_id": {
        "_id": "61bdd97613eab893a8c70168",
        "shop_name": "LOCAL KITCHEN"
      },
      "location_id": {
        "_id": "61badec2f0c292acc0387e8c",
        "location": "Mannar "
      },
      "menu_id": {
        "_id": "61e022ff533418ce8419890e",
        "menu_name": " PERI PERI AL FAHAM  FULL "
      },
      "menu_desc": "PERI PERI ALFAHAM FULL",
      "purchaseRate": 423,
      "salesRate": 470,
      "packingCharge": 2,
      "discount": "0",
      "discamountAmount": 423,
      "availableTime": "15:30",
      "closingTime": "21:45",
      "status": "Inactive",
      "show": "Show",
      "__v": 0
    }


  ]
  facilites = ['AC Classrooms', 'Swimming Pool', 'Day Boarding', 'Transportation', 'Outdoor Play Area']

  districtList = [];
  stateList = [];
  filteredList1;
  currLat: any;
  currLng: any;
  ngOnInit(): void {
    // fetching student details

    this.studentIDforMap = JSON.parse(localStorage.getItem("USERID"));
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      console.log(returnData)
      this.studentDetails = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch student details')
    });
    this.loadData();
    this.isNri = JSON.parse(localStorage.getItem("isNri"));
    console.log(this.isNri);

    this.form = this.formBuilder.group({
      CourseCategoryId: [''],
      CourseSubCategoryId: [''],
      // courseTypeId: [''],
      CourseSubCategory2Id: [''],
      CourseSubCategory3Id: [''],
      CourseSubCategory4Id: [''],
      CourseSubCategory5Id: [''],
      districtId: [''],
      stateId: ['', Validators.required],
      instituteId: ['']
    });


    this.instituteform = this.formBuilder.group({
      instituteName: ['']
    })
    this.filteredList1 = this.stateList.slice();
    console.log(window.location.origin + this.router.url);
    console.log(sessionStorage.getItem("formfields"));
    this.formvaluessession = JSON.parse(sessionStorage.getItem("formfields"))
    if (this.formvaluessession != null) {
      this.reloadOnbackClicked(this.formvaluessession)
    }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {

    //     this.currLat = position.coords.latitude;
    //     this.currLng = position.coords.longitude;
    //     console.log(this.currLat);
    //     console.log(this.currLng);


    //   });
    // }
    // else {
    //   alert("Geolocation is not supported by this browser.");
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log("Current latitute and logitude", this.currLat, this.currLng);

      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }


  }

  loadData(): void {
    this.apiService.doGetRequest(`/course-categories`).subscribe((returnData: any) => {
      this.accademicLevels = returnData.data;
      console.log("accademic levels ", this.accademicLevels);
    });
    this.apiService.doGetRequest(endPoints.Get_courseTypes).subscribe((returnData: any) => {
      this.courseTypes = returnData.data;
      console.log("course types ", this.courseTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_universityTypes).subscribe((returnData: any) => {
      this.universityTypes = returnData.data;
      console.log("university types", this.universityTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_courseStream).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log("courseStreams ", this.courseStreams);
    });
    this.apiService.doGetRequest(`state/`).subscribe((returnData: any) => {
      // this.stateList.push(returnData.data)
      this.stateList = returnData.data;
      var start = new Date().getTime();
      console.log("starttime", start);

      this.testlist.forEach(data =>{
        this.restlist.findIndex(obj => {
          if (obj.menu_desc === data.menu_desc && obj.closingTime === data.closingTime) {
              obj.menu_desc = "asddddddddddddddddddddddddddddddddddddddddd"
              obj.closingTime = "updated dataa"
          }
        }
  
        );
      })
     
      // function ischeck(obj) {
      //   console.log(this.testlist);
        
      //   this.testlist.forEach(element => {
      //     if (obj.menu_desc == element.menu_desc ) {
      //       obj.menu_desc = "asddddddddddddddddddddddddddddddddddddddddd";
      //       obj.salesRate = "asddddddddddddddddddddddddddddddddddddddddd";
      //     }
      //   });
       

      // }
      // this.restlist.findIndex(ischeck)

      // this.testlist.forEach(data =>{

      // })



      var end = new Date().getTime();
      console.log("endtime", end);

      var time = end - start;
      console.log('Execution time: ' + time);
      console.log("adasdasdasdasd", this.restlist);
      console.log("lenght -======", this.restlist.length);


      let req = {
        createdAt: "2021-07-09T06:10:38.752Z",
        id: 0,
        state: "All",
        updatedAt: "2021-07-09T06:10:38.752Z"
      }
      // this.stateList.push(req)
      // var suits = ["hearts", "clubs", "Brooks Brothers", "diamonds", "spades"];

      this.stateList.splice(0, 0, req);


      console.log(this.stateList);
    });
  }

  loadAccademicLevelCourses(event): void {

    // const academicLevelId = event.target.value;
    const academicLevelId = event;

    this.apiService.doGetRequest(`course-categories/subcategory/` + academicLevelId).subscribe((returnData: any) => {
      this.accademicLevelsCourses = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }

  loadCourseStreamSpecializations(event): void {
    const streamId = event.target.value;
    // alert(academicLevelId)
    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }
  loadAccademicLevelCoursessubcat(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory2/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat1(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory3/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat2(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory4/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations3 = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat3(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory5/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations4 = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  removeEmptyStringsData(obj) {
    const dataObj = { ...obj };
    Object.entries(dataObj).forEach(([key, val]) => val === "" && delete dataObj[key] && dataObj[key] !== []);
    let urlParams = new URLSearchParams();
    for (let key of Object.keys(dataObj)) {
      urlParams.set(key, dataObj[key])
    }
    return urlParams;
  }
  reloadOnbackClicked(formvaluessession) {
    const formData = formvaluessession;
    console.log(formData);
    for (var key in formData) {
      if (formData[key] === "") {
        delete formData[key];
      } else {
        // formData[Map[key]] = formData[key];
        // delete formData[key];
      }
    }

    console.log(formData);

    this.apiService.doPostRequest(
      endPoints.Get_course_filter, formData
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(returnData)
        for (let i = 0; i < this.courses.length; i++) {
          this.instutesname.push(this.courses[i]?.item.Institute)

        }
        for (let list of this.instutesname) {
          map[Object.values(list).join('')] = list;
        }
        console.log('Using Map', Object.values(map));
        this.instutesname = Object.values(map)
        this.courses.map(x => {
          let notificationdata = [];
          notificationdata = x.notificationData;
          if (notificationdata.length === 0) {
            x.notificationenabled = false;
          }
          else {
            for (let i = 0; i < notificationdata.length; i++) {
              if (notificationdata[i].studentId === this.studentIDforMap) {
                x.notificationenabled = true;
              }
              else {
                x.notificationenabled = false;

              }
            }
          }

        })
        this.courses.map(x => x.currentLocation = this.getFucntionCorordr(x))
        console.log('Using locationcord', this.courses);

      }
      else {
        this.toastr.error('Something went wrong!');
      }
    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }
  clearFilter() {
    this.form.reset();
  }
  onSubmit() {
    this.touched = true;
    console.log(document.getElementsByClassName('ng-invalid'))
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    console.log(formData);
    for (var key in formData) {
      if (formData[key] === "") {
        delete formData[key];
      } else {
        // formData[Map[key]] = formData[key];
        // delete formData[key];
      }
    }

    console.log(formData);
    sessionStorage.setItem("formfields", JSON.stringify(this.form.value))
    this.apiService.doPostRequest(
      endPoints.Get_course_filter, formData
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(returnData)
        for (let i = 0; i < this.courses.length; i++) {
          this.instutesname.push(this.courses[i]?.item.Institute)

        }
        for (let list of this.instutesname) {
          map[Object.values(list).join('')] = list;
        }
        console.log('Using Map', Object.values(map));
        this.instutesname = Object.values(map)

        this.courses.map(x => x.currentLocation = this.getFucntionCorordr(x))
        console.log('Using locationcord', this.courses);

      }
      else {
        this.toastr.error('Something went wrong!');
      }

      this.courses.map(x => {
        let notificationdata = [];
        notificationdata = x.notificationData;
        if (notificationdata.length === 0) {
          x.notificationenabled = false;
        }
        else {
          for (let i = 0; i < notificationdata.length; i++) {
            if (notificationdata[i].studentId === this.studentIDforMap) {
              x.notificationenabled = true;
            }
            else {
              x.notificationenabled = false;

            }
          }
        }

      })
      console.log(this.courses);


    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }
  getFucntionCorordr(data) {
    // return "rest"
    var R = 6371;
    var lat2: any = data?.item?.Institute?.gmapLatitude;
    var lon3: any = data?.item?.Institute?.gmapLongitude;
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - this.currLat) * p) / 2 +
      (c(this.currLat * p) *
        c(lat2 * p) *
        (1 - c((lon3 - this.currLng) * p))) /
      2;

    let finalcount = Math.round(12742 * Math.asin(Math.sqrt(a)))
    return finalcount
    // console.log(12742 * Math.asin(Math.sqrt(a)), 'Km')
  }
  get f() { return this.form.controls; }
  Onselected(s) {
    this.active_index = s;
    this.courses = [];
  }
  next() {
    this.paginationCount++;

  }
  prev() {

    if (this.paginationCount === 1) {

    }
    else {
      this.paginationCount--;
    }
  }
  loaddistricts(event) {
    console.log(event);

    this.stateId = event;
    this.apiService.doGetRequest(`district/` + event).subscribe((returnData: any) => {
      this.districtList = returnData.data;
      let req = {
        createdAt: "2021-07-09T06:10:38.752Z",
        id: 0,
        district: "All",
        updatedAt: "2021-07-09T06:10:38.752Z"
      }
      // this.districtList.push(req)
      this.districtList.splice(0, 0, req);
      console.log(this.districtList);
    });


  }
  searchByLocation() {
    let req = {
      "stateId": this.stateId,
      "districtId": this.district
    }
    this.apiService.doPostRequest(
      `institute/course/filter/location`, req
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(this.courses)
      }
      else {
        this.toastr.error('Something went wrong!');
      }
    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }
  addtocompare(item) {
    console.log(item);
    let req = {
      "courseName": item.CourseName,
      "studentId": this.studentId,
      "instituteCourseId": item.item.id,
      "instituteId": item.item.Institute.id
    }
    console.log(req);
    this.apiService.doPostRequest(`CourseCompare/create`, req).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Course add to compare section")
      }
    )
  }
  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if (this.courses[index].isActive) {
      this.courses[index].isActive = false;
    } else {
      this.courses[index].isActive = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  getaddmisonsnstartcount(item) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let s = mm + '/' + dd + '/' + yyyy;
    this.currentdate = mm + '-' + dd + '-' + yyyy;
    var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    var date1 = new Date(item['admissionStartDate']);
    var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    // this.addmisionstartdateCount2 = Math.round(Difference_In_Days);
    // console.log("1th arrays",this.addmisionstartdateCount2);
    // let d1 = item['admissionStartDate']
    // console.log(new Date(d1));

    // d1 = d1.split("T");
    // d1 = d1[0];
    // d1 = d1.split("-");


    // let d2 = item['admissionCloseDate']
    // d2 = d2.split("T")
    // console.log(d2);
    // d2 = d2[0]
    // d2 = d2.split("-");

    // let c = this.currentdate.split("-");

    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  
    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    let d1 = item['admissionStartDate']
    d1 = new Date(d1);
    let d2 = item['admissionCloseDate']
    d2 = new Date(d2);
    var check = new Date(this.currentdate);
    // console.log(d1);
    // console.log(d2);
    // console.log(check);
    // console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24));
    // console.log(diffDays);

    if (check > d1 && check < d2) {
      // console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days > 0) {
        this.addmisonstarts = "Admission Closes in " + Math.round(Difference_In_Days) + " Days "
      }
      else {
        this.addmisonstarts = "Admission Closes in " + Math.round(Difference_In_Days) * -1 + " Days "
      }


      return this.addmisonstarts;

    }
    else {
      // console.log("Admission not started yet or admission closed" );
      if (check < d1) {
        if (Difference_In_Days > 0) {
          this.addmisonstarts = "Admission Desk Opens in" + Math.round(Difference_In_Days) + " Days"
        }
        else {
          this.addmisonstarts = "Admission Desk Opens in" + Math.round(Difference_In_Days) * -1 + " Days"
        }

        return this.addmisonstarts;
      }
      else {
        // console.log("addmison closed");
        return this.addmisonstarts = "Admission Closed";

      }
    }



    // if (Math.round(Difference_In_Days) > 0) {
    //   this.addmisonstarts = "Admission Starts " + Math.round(Difference_In_Days) + " Days"
    // }
    // else {
    //   var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    //   var yyyy = today.getFullYear();
    //   let s = mm + '/' + dd + '/' + yyyy;
    //   var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    //   var date1 = new Date(item['admissionCloseDate']);
    //   var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    //   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //   this.addmisonstarts = "Admission Close " + Math.round(Difference_In_Days) + " Days Left"
    // }
    // return this.addmisonstarts;
  }

  admionstatus(item) {
    // console.log(item);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let s = mm + '/' + dd + '/' + yyyy;
    this.currentdate = mm + '-' + dd + '-' + yyyy;
    var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    var date1 = new Date(item['admissionStartDate']);
    var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    // this.addmisionstartdateCount2 = Math.round(Difference_In_Days);
    // console.log("1th arrays",this.addmisionstartdateCount2);
    // let d1 = item['admissionStartDate']
    // console.log(new Date(d1));

    // d1 = d1.split("T");
    // d1 = d1[0];
    // d1 = d1.split("-");


    // let d2 = item['admissionCloseDate']
    // d2 = d2.split("T")
    // console.log(d2);
    // d2 = d2[0]
    // d2 = d2.split("-");

    // let c = this.currentdate.split("-");

    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  
    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    let d1 = item['admissionStartDate']
    d1 = new Date(d1);
    let d2 = item['admissionCloseDate']
    d2 = new Date(d2);
    var check = new Date(this.currentdate);
    // console.log(d1);
    // console.log(d2);
    // console.log(check);
    // console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24));
    // console.log(diffDays);

    if (check > d1 && check < d2) {

      // console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days > 0) {
        this.addmisonstarts = "Opened"
      }
      else {
        this.addmisonstarts = "Opened"
      }


      return this.addmisonstarts;

    }
    else {
      // console.log("Admission not started yet or admission closed" );
      if (check < d1) {

        if (Difference_In_Days > 0) {
          this.addmisonstarts = "Not Started"
        }
        else {
          this.addmisonstarts = "Not Started"
        }

        return this.addmisonstarts;
      }
      else {
        // console.log("addmison closed");

        return this.addmisonstarts = "Closed";

      }
    }
  }
  applycourse(item) {

    // sessionStorage.setItem("buttonclicked",JSON.stringify(true))
    sessionStorage.setItem("formfields", JSON.stringify(this.form.value))

    sessionStorage.setItem("coursename", JSON.stringify(item))
    this.router.navigate(['/student/course/apply/' + item.item.id])



  }
  viewInstitute() {
    // sessionStorage.setItem("buttonclicked",JSON.stringify(true))
    sessionStorage.setItem("formfields", JSON.stringify(this.form.value))
  }
  viewCourse(s) {
    sessionStorage.setItem("formfields", JSON.stringify(this.form.value))
    sessionStorage.setItem("courseinfo", JSON.stringify(s))
    this.router.navigate(['/student/view-courses'])
  }
  errorEvnt(event) {
    event.target.src = "./assets/images/inst.png";
  }
  selectedchips(s) {
    this.selectedchipsvalues.push(s)
    var unique = this.selectedchipsvalues.filter(function (elem, index, self) {
      console.log(elem);
      return index === self.indexOf(elem);
    })
    console.log(unique);
    let sorrteedarray = [];
    this.selectedchipsvalues = unique;
    // for(let i = 0 ;i<=this.selectedchipsvalues.length;i++)
    // {
    //   if(this.selectedchipsvalues[i].name === 'Boys')
    //   {
    //     for(let j =0; j<=this.courses.length;j++ )
    //     {
    //       if(this.courses[j]?.item?.maleAllowed === this.selectedchipsvalues[i].status){
    //         sorrteedarray.push(this.courses[j])
    //         console.log(sorrteedarray);
    //       }
    //     }
    //   }
    // }


  }
  clear() {
    this.selectedchipsvalues = [];
  }

  notificationOff(item) {
    // this.notificationonstatus = false;
    console.log(item);
    // let req = {
    //   instituteCourseId:item?.item?.id,
    //   studentId:this.studentIDforMap

    // }
    let courseId = item?.item?.id

    this.apiService.doDeleteRequest("institute/course/notification/subscription/delete/" + courseId + '/' + this.studentIDforMap).subscribe(
      data => {
        this.getfilterdatabasedonFormvalues();
      },
      error => {

      }
    )


  }


  getfilterdatabasedonFormvalues() {
    this.apiService.doPostRequest(
      endPoints.Get_course_filter, this.form.value
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(returnData)
        for (let i = 0; i < this.courses.length; i++) {
          this.instutesname.push(this.courses[i]?.item.Institute)

        }
        for (let list of this.instutesname) {
          map[Object.values(list).join('')] = list;
        }
        console.log('Using Map', Object.values(map));
        this.instutesname = Object.values(map)
      }
      else {
        this.toastr.error('Something went wrong!');
      }

      this.courses.map(x => {
        let notificationdata = [];
        notificationdata = x.notificationData;
        if (notificationdata.length === 0) {
          x.notificationenabled = false;
        }
        else {
          for (let i = 0; i < notificationdata.length; i++) {
            if (notificationdata[i].studentId === this.studentIDforMap) {
              x.notificationenabled = true;
            }
            else {
              x.notificationenabled = false;

            }
          }
        }

      })
      console.log(this.courses);


    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }

  notificationon(item) {
    console.log(item);

    // this.notificationonstatus = true;
    let req = {
      instituteCourseId: item?.item?.id,
      studentId: this.studentIDforMap
    }
    this.apiService.doPostRequest("institute/course/notification/subscription", req).subscribe(
      data => {
        this.getfilterdatabasedonFormvalues();

      },
      error => {

      }
    )
  }
  selectinstitute(s) {
    console.log(s);
    let req = {
      name: s.name
    }
    this.selectedchipsvalues.push(req)
    var unique = this.selectedchipsvalues.filter(function (elem, index, self) {
      console.log(elem);

      return index === self.indexOf(elem);
    })
    console.log(unique);
    this.selectedchipsvalues = unique;


  }
  getselected(s) {

  }
  getcourseduration(s) {
    // console.log("courseduration", s);
    // console.log(s.split('s'));
    let char = s.split('s');
    return char[0] + "\xa0" + char[1] + "\xa0" + char[2] + "\xa0"
    // if(char.length === 4)

    // {
    // + char[3]
    // }
    // else
    // {
    //   return char[0];
    // }
  }
  changedevent(event) {
    console.log(event.target.value);
    console.log(this.instituteform.value);
    this.form.controls['instituteId'].setValue(this.instituteform.value['instituteName'])

    // this.selectedvalueradio = event.target.value;
    // console.log(this.selectedvalueradio);

    // this.form.controls['instituteId'].setValue(event.target.value)
    this.reloadOnbackClicked(this.form.value)
  }
  filter() {
    this.courses.sort((n1, n2) => {
      if (parseInt(n1.currentLocation) > parseInt(n2.currentLocation)) {
        return 1;
      }

      if (parseInt(n1.currentLocation) < parseInt(n2.currentLocation)) {
        return -1;
      }

      return 0;
    });
    console.log("soretedrrray", this.courses);

  }
}


// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     this.currLat = "53.32055555555556";
//     this.currLng = "-1.7297222222222221";
//     console.log(this.currLat);
//     console.log(this.currLng);

//     var R = 6371;
//     var lat2: any = '53.31861111111111';
//     var lon3: any = '-1.6997222222222223';
//     var p = 0.017453292519943295;
//     var c = Math.cos;
//     var a =
//       0.5 -
//       c((lat2 - this.currLat) * p) / 2 +
//       (c(this.currLat * p) *
//         c(lat2 * p) *
//         (1 - c((lon3 - this.currLng) * p))) /
//         2;
//     console.log(12742 * Math.asin(Math.sqrt(a)), 'Km');
//   });
// } else {
//   alert('Geolocation is not supported by this browser.');
// }