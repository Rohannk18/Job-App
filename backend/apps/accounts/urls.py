from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookmarkViewSet, ProfileView, RegisterView, ResumeViewSet

router = DefaultRouter()
router.register("resumes", ResumeViewSet, basename="resume")
router.register("bookmarks", BookmarkViewSet, basename="bookmark")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]
