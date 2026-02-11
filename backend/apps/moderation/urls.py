from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import EmployerVerificationViewSet, JobReportViewSet

router = DefaultRouter()
router.register("reports", JobReportViewSet, basename="job-report")
router.register("verifications", EmployerVerificationViewSet, basename="employer-verification")

urlpatterns = [path("", include(router.urls))]
