from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.accounts.models import UserProfile
from .models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = UserProfile.objects.filter(user=self.request.user).first()
        if profile and profile.role == UserProfile.ROLE_EMPLOYER:
            return Application.objects.filter(job__company__owner=self.request.user)
        if profile and profile.role == UserProfile.ROLE_ADMIN:
            return Application.objects.all()
        return Application.objects.filter(applicant=self.request.user)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)
