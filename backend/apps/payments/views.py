from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Payment, SubscriptionPlan
from .serializers import PaymentSerializer, SubscriptionPlanSerializer


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SubscriptionPlan.objects.all()


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(payer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(payer=self.request.user)
