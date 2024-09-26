<script setup lang="ts">
import {
  alcoholSorbetCocktail,
  classicSorbetCocktail,
  classicSorbetCocktails,
  barCostTableHeaders,
  barCostTableData,
  presentationOffers,
  presentationSlider,
  sorbetCostTableHeaders,
  sorbetCostTableData,
} from "~/data/content";
import BarSlider from "~/components/BarSlider.vue"
import BarTable from "~/components/BarTable.vue"
import CocktailsList from "~/components/CocktailsList.vue";

</script>

<template>
  <div class="presentation-section">
    <div class="intro-image h-auto w-full"
         style="background-image: url('/images/label-image.jpg')">
      <div role="heading" aria-level="1" style="visibility: hidden">Reset bar</div>
      <h1 class="main-title">R<span>e</span>S<span>e</span>T</h1>
      <h2 class="secondary-title">CLASSIC <br> BAR</h2>
      <CallUsButton />
    </div>
    <section
        v-for="({name, description, image}, index) in presentationOffers"
        :key="`offer-${index}`"
        class="section app-brief">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 left-align">
            <h2 v-if="name" class="white-text">{{ name }}</h2>
            <div class="colored-line-left"/>
            <div v-html="description"/>
          </div>
          <div class="col-sm-6">
            <div class="section-image" :style="`background-image: url(${image})`"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section screenshots">
      <div class="container">
        <BarSlider class="slider" :slider-data="presentationSlider"
        />
      </div>
    </section>
    <section class="section deep-dark-bg">
      <div class="container">
        <BarTable
            :table-headers="barCostTableHeaders"
            title="СТОИМОСТЬ РАБОТЫ БАРА"
            table-description="Организация барной зоны – 300. Включает: аренда барной стойки, транспортные расходы грузового авто по Минску, монтаж/демонтаж. Стоимость коктейлей включает: продукция для приготовления, работа барменов, аренда бокалов, лед."
            :table-data="barCostTableData" />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <CocktailsList
            title="КЛАССИЧЕСКИЕ КОКТЕЛИ НА ОСНОВЕ СОРБЕТА"
            :list="classicSorbetCocktails"/>
      </div>
    </section>
    <section class="section deep-dark-bg">
      <div class="container">
        <CocktailsList
            title="КЛАССИЧЕСКИЙ СОРБЕТ"
            :list="classicSorbetCocktail"/>
      </div>
    </section>
    <section class="section ">
      <div class="container">
        <CocktailsList
            title="АЛКОГОЛЬНЫЙ СОРБЕТ"
            description="Интерактивное приготовление алкогольного сорбета при гостях"
            :list="alcoholSorbetCocktail"/>
      </div>
    </section>
    <section class="section deep-dark-bg">
      <div class="container">
        <BarTable
            :table-headers="sorbetCostTableHeaders"
            title="СТОИМОСТЬ СОРБЕТ БАРА"
            table-description="* В стоимость входит вся необходимая продукция, организация барной зоны, 2 бармена, транспортные расходы по Минску."
            :table-data="sorbetCostTableData" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "assets/css/presentation.scss";

.intro-image {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 90vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 100px;
  .main-title, .decondary-title {
    font-family: 'TTDrugs-Thin', Roboto, sans-serif;
  }

  .main-title {
    font-size: 190px;
    letter-spacing: 47px;
    line-height: 190px;
    margin-bottom: 115px;
    span {
      font-size: 270px;
    }
  }
  .secondary-title {
    font-size: 35px;
    letter-spacing: 15px;
  }
  @media screen and (max-width: 991px) {
    .main-title {
      font-size: 80px;
      line-height: 80px;
      letter-spacing: 20px;
      span {
        font-size: 110px;
      }
    }
    .secondary-title {
      font-size: 25px;
      line-height: 40px;
      letter-spacing: 10px;
    }
  }
  @media screen and (max-width: 767px) {
    .main-title {
      font-size: 60px;
      line-height: 60px;
      letter-spacing: 15px;
      span {
        font-size: 83px;
      }
    }
    .secondary-title {
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 10px;
    }
  }
}

.section {
  display: flex;
  justify-content: center;
  padding-top: 0.67em;
  padding-bottom: 0.67em;
}

.app-brief {
  &:nth-child(odd) .row {
    flex-direction: row-reverse;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .container {
      width: 750px
    }
  }

  @media (min-width: 992px) {
    .container {
      width: 970px
    }
  }

  @media (min-width: 1200px) {
    .container {
      width: 1170px
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .left-align {
    text-align: left;
    margin-bottom: 50px;
  }

  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9 {
      float: left;
    }
  }

  @media (min-width: 576px) {
  .col-sm-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (min-width: 768px) {
    .col-sm-6 {
      width: 50%;
    }
  }
}
}
</style>
