from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PaymentViewSet, SubscriptionPlanViewSet

router = DefaultRouter()
router.register("plans", SubscriptionPlanViewSet, basename="subscription-plan")
router.register("payments", PaymentViewSet, basename="payment")

urlpatterns = [path("", include(router.urls))]
